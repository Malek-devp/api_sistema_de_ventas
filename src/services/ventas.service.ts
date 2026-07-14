import pool from '../database/db.js';
import type { Ventas, AnularVentaResponse } from '../interface/venta.interface.js'

export async function getVentasDB(): Promise<Ventas[]> {
    try {
        const result = await pool.query('SELECT * FROM ventas');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener las ventas');
    }
}

export async function postVentasDB(id_usuario: number): Promise<Ventas> {
    try {
        const result = await pool.query('INSERT INTO ventas(id_usuario) VALUES($1) RETURNING *', [id_usuario]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear la venta');
    }
}

export async function putVentasDB(id: number): Promise<AnularVentaResponse> {
    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        // 1. Verificar si la venta ya está anulada para no duplicar el stock por error
        const queryVenta = 'SELECT estado FROM ventas WHERE id = $1;';
        const resVenta = await client.query(queryVenta, [id]);

        if (resVenta.rows.length === 0) {
            throw new Error('La venta no existe.');
        }
        if (resVenta.rows[0].estado === 'Anulada') {
            throw new Error('Esta venta ya fue anulada previamente.');
        }

        // 2. Traer todos los productos y cantidades que se compraron en esa venta
        const queryDetalle = 'SELECT producto_id, cantidad FROM detalle_ventas WHERE venta_id = $1;';
        const resDetalle = await client.query(queryDetalle, [id]);

        // 3. Recorrer los artículos devueltos y SUMARLOS al stock de la tabla productos
        for (const articulo of resDetalle.rows) {
            const queryStock = `
                UPDATE productos 
                SET stock = stock + $1 
                WHERE id = $2;
            `;
            await client.query(queryStock, [articulo.cantidad, articulo.producto_id]);
        }

        // 4. Cambiar el estado de la venta principal a 'Anulada'
        const queryActualizarVenta = `
            UPDATE ventas 
            SET estado = 'Anulada' 
            WHERE id = $1;
        `;
        await client.query(queryActualizarVenta, [id]);

        // 5. Si todo salió bien, guardamos los cambios definitivamente
        await client.query('COMMIT');
        return ({ ok: true, msg: 'Venta anulada y stock devuelto con éxito.' });

    } catch (error) {
        // Si algo falla, deshacemos todo (¡el stock no se devuelve dos veces!)
        await client.query('ROLLBACK');
        const message = error instanceof Error ? error.message : 'Error desconocido'
        return ({ ok: false, msg: message });

    } finally {
        client.release();
    }
}