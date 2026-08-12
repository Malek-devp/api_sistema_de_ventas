import pool from "../database/db.js";
import type { Producto, CrearProducto } from '../interface/productos.interface.js'

export class ProductosRepository {
    async findAllProductos(): Promise<Producto[]> {
        try {
            const result = await pool.query(
                `SELECT p.*, c.nombre AS categoria_nombre
                 FROM productos p
                 INNER JOIN categorias c ON p.id_categoria = c.id`
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async create(producto: CrearProducto): Promise<Producto> {
        try {
            const { marca, precio, stock, id_categoria } = producto;
            const result = await pool.query('INSERT INTO productos(marca, precio, stock, id_categoria) VALUES($1, $2, $3, $4) RETURNING *', [marca, precio, stock, id_categoria]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async update(id: number, producto: CrearProducto): Promise<Producto> {
        try {
            const { marca, precio, stock, id_categoria } = producto;
            const result = await pool.query('UPDATE productos SET marca = $1, precio = $2, stock = $3, id_categoria = $4 WHERE id = $5 RETURNING *', [marca, precio, stock, id_categoria, id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async delete(id: number): Promise<Producto>{
        try {
            const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch(error) {
            throw new Error(`Error: ${error}`);
        }
    }
}