import pool from "../database/db.js";

export const getDetalleVentasDB = async () => {
    try {
        const result = await pool.query('SELECT * FROM detalle_ventas')
        return result.rows
    } catch (error) {
        throw error; // FIX: throw directo, no new Error({message:error}) que produce "[object Object]"
    }
}

export const postDetalleVentasDB = async (venta_id, producto_id, precio_unitario, cantidad) => {
    try {
        const result = await pool.query('INSERT INTO detalle_ventas (venta_id, producto_id, precio_unitario, cantidad) VALUES ($1, $2, $3, $4) RETURNING *', [venta_id, producto_id, precio_unitario, cantidad])
        return result.rows[0]
    } catch (error) {
        throw error; // FIX: throw directo, no new Error({message:error}) que produce "[object Object]"
    }
}

// FIX: agregar endpoints faltantes
export const putDetalleVentasDB = async (id, venta_id, producto_id, precio_unitario, cantidad) => {
    try {
        const result = await pool.query('UPDATE detalle_ventas SET venta_id=$1, producto_id=$2, precio_unitario=$3, cantidad=$4 WHERE id=$5 RETURNING *', [venta_id, producto_id, precio_unitario, cantidad, id])
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}

export const deleteDetalleVentasDB = async (id) => {
    try {
        const result = await pool.query('DELETE FROM detalle_ventas WHERE id=$1 RETURNING *', [id])
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}