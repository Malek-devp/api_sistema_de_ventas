import pool from "../database/db.js";

import type {DetalleVentas, detalleResponse} from '../interface/detalleVenta.interface.js'

export const getDetalleVentasDB = async ():Promise<DetalleVentas[]> => {
    try {
        const result = await pool.query('SELECT * FROM detalle_ventas')
        return result.rows
    } catch (error) {
        throw error; // FIX: throw directo, no new Error({message:error}) que produce "[object Object]"
    }
}

export const postDetalleVentasDB = async (venta_id:number, producto_id:number, precio_unitario:number, cantidad:number):Promise<detalleResponse> => {

    const client = await pool.connect(); // abrimos una conección unica
 
    try {
        await client.query('BEGIN'); // Iniciamos la transacción

        const productoId = await client.query('SELECT * FROM productos WHERE id = $1', [producto_id])

        if(productoId.rows.length === 0){
            return ({
                ok:false,
                msg:"El producto no esta en existencia "
            })
        }
        //Descontamos el stock en la tabla productos
        const queryStock = `
        UPDATE productos
        SET stock = stock - $1
        WHERE id = $2
        RETURNING stock;`// usamos RETURNING stock para verificar si el inventario quedó en negativo

        const resStock = await client.query(queryStock, [cantidad, producto_id]);

        //validación por seguridad por si no hay suficiente stock
        if(resStock.rows[0].stock < 0){
            throw new Error(`Stock insuficiente para el producto`);
        }

        //insertar en detalle de ventas
        const queryDetalle = `
        INSERT INTO detalle_ventas (venta_id, producto_id, precio_unitario, cantidad)
        VALUES ($1, $2, $3, $4) RETURNING *;`;

        await client.query(queryDetalle, [venta_id, producto_id, precio_unitario, cantidad])

        const getDetalle = await client.query('SELECT subtotal FROM detalle_ventas WHERE venta_id = $1', [venta_id])

        if(getDetalle.rows.length === 0){
            throw new Error(`Error al obtener el subtotal de la venta`);
        }

        await client.query('UPDATE ventas SET subtotal = $1 WHERE id = $2',[getDetalle.rows[0].subtotal, venta_id])

        // si todo salió bien, confirmamos los cambios en la base de datos
        await client.query('COMMIT');
        return({
            ok:true,
            msg: "venta registrada e inventario actualizado"
        })

    } catch (error) {
        await client.query('ROLLBACK');
        const message = error instanceof Error ? error.message : 'Error desconocido'
        return({
            ok:false,
            msg:message
        })
    }finally{
        //simpre liberar el cliente para que vuelva al pool de conexiones
        client.release();
    }
}
 
// FIX: agregar endpoints faltantes
export const putDetalleVentasDB = async (id:number, venta_id:number, producto_id:number, precio_unitario:number, cantidad:number):Promise<DetalleVentas> => {
    try {
        const result = await pool.query('UPDATE detalle_ventas SET venta_id=$1, producto_id=$2, precio_unitario=$3, cantidad=$4 WHERE id=$5 RETURNING *', [venta_id, producto_id, precio_unitario, cantidad,id])
        return result.rows[0]
    } catch (error) {
        throw error; 
    }
}
