import pool from "../database/db.js";

import type { Usuario } from '../interface/usuario.interface.js'

export class UsuariosRepository {
    async findAll(): Promise<Usuario[] | undefined> {
        try {
            const data = await pool.query(
                `SELECT u.*, r.cargo AS rol_cargo
                 FROM usuarios u
                 INNER JOIN roles r ON u.id_rol = r.id`
            );
            return data.rows;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return undefined;
        }
    }

    async findByDni(dni: string): Promise<Usuario | undefined> {
        try {
            const data = await pool.query(
                `SELECT u.*, r.cargo AS rol_cargo
                 FROM usuarios u
                 INNER JOIN roles r ON u.id_rol = r.id
                 WHERE u.dni = $1`, [dni]
            );
            return data.rows[0] ?? undefined;
        } catch (error) {
            console.error('Error al obtener el usuario por DNI:', error);
            return undefined;
        }
    }

    async findById(id: number): Promise<Usuario | undefined> {
        try {
            const data = await pool.query(
                `SELECT u.*, r.cargo AS rol_cargo
                 FROM usuarios u
                 INNER JOIN roles r ON u.id_rol = r.id
                 WHERE u.id = $1`, [id]
            );
            return data.rows[0] ?? undefined;
        } catch (error) {
            console.error('Error al obtener el usuario por ID:', error);
            return undefined;
        }
    }

    async create(nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined> {
        try {
            const data = await pool.query(
                `INSERT INTO usuarios (nombre, dni, id_rol) VALUES ($1, $2, $3) RETURNING *`,
                [nombre, dni, id_rol]
            );
            return data.rows[0] ?? undefined;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return undefined;
        }
    }

    async update(id: number, nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined> {
        try {
            const data = await pool.query(
                `UPDATE usuarios SET nombre = $1, dni = $2, id_rol = $3 WHERE id = $4 RETURNING *`,
                [nombre, dni, id_rol, id]
            );
            return data.rows[0] ?? undefined;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return undefined;
        }
    }

    async delete(id: number): Promise<Usuario | undefined> {
        try {
            const data = await pool.query(
                `DELETE FROM usuarios WHERE id = $1 RETURNING *`, [id]
            );
            return data.rows[0] ?? undefined;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return undefined;
        }
    }
}