import pool from '../database/db.js';

export async function getProductosDB() {
    try {
        const result = await pool.query('SELECT * FROM productos');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
}

export async function postProductosDB(marca, precio, stock, id_categoria) {
    try {
        const result = await pool.query('INSERT INTO productos(marca, precio, stock, id_categoria) VALUES($1, $2, $3, $4) RETURNING *', [marca, precio, stock, id_categoria]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear el producto');
    }
}

export async function putProductosDB(id, marca, precio, stock, id_categoria) {
    try {
        const result = await pool.query('UPDATE productos SET marca = $1, precio = $2, stock = $3, id_categoria = $4 WHERE id = $5 RETURNING *', [marca, precio, stock, id_categoria, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al actualizar el producto');
    }
}

export async function deleteProductosDB(id) {
    try {
        const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al eliminar el producto');
    }
}