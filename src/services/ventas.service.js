import pool from '../database/db.js';

export async function getVentasDB() {
    try {
        const result = await pool.query('SELECT * FROM ventas');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener las ventas');
    }
}

export async function postVentasDB(id_usuario, fecha, subtotal, igv, total) {
    try {
        const result = await pool.query('INSERT INTO ventas(id_usuario, fecha, subtotal, igv, total) VALUES($1, $2, $3, $4, $5) RETURNING *', [id_usuario, fecha, subtotal, igv, total]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear la venta');
    }
}

export async function putVentasDB(id, id_usuario, fecha, subtotal, igv, total) {
    try {
        const result = await pool.query('UPDATE ventas SET id_usuario=$1, fecha=$2, subtotal=$3, igv=$4, total=$5 WHERE id = $6 RETURNING *', [id_usuario,fecha, subtotal, igv, total, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al actualizar la venta')
    }
}

// FIX: agregar endpoint faltante
export async function deleteVentasDB(id) {
    try {
        const result = await pool.query('DELETE FROM ventas WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al eliminar la venta');
    }
}