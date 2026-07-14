import pool from '../database/db.js';
import type { Rol, CrearRol } from '../interface/roles.interface.js';
import type { QueryResult } from 'pg';

export async function getRolesDB(): Promise<Rol[]> {
    try {
        const result: QueryResult<Rol> = await pool.query('SELECT * FROM roles');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los roles');
    }
}

export async function postRolesDB(cargo: CrearRol['cargo']): Promise<Rol> {
    try {
        const result: QueryResult<Rol> = await pool.query('INSERT INTO roles(cargo)VALUES($1) RETURNING *', [cargo]);
        return result.rows[0] as Rol;
    } catch (error) {
        throw new Error('Error al crear el rol');
    }
}

export async function putRolesDB(id: number, cargo: CrearRol['cargo']): Promise<Rol | null> {
    try {
        const result: QueryResult<Rol> = await pool.query('UPDATE roles SET cargo=$1 WHERE id=$2 RETURNING *', [cargo, id]);
        if (result.rows.length === 0) return null;
        return result.rows[0] as Rol;
    } catch (error) {
        throw new Error('Error al actualizar el rol');
    }
}

export async function deleteRolesDB(id: number): Promise<Rol | null> {
    try {
        const result: QueryResult<Rol> = await pool.query('DELETE FROM roles WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0] as Rol;
    } catch (error) {
        throw new Error('Error al eliminar el rol');
    }
}
