import pool from '../database/db.js';

export async function getRolesDB() {
    try {
        const result = await pool.query('SELECT * FROM roles');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los roles');
    }
}

export async function postRolesDB(cargo) {
    try {
        const result = await pool.query('INSERT INTO roles(cargo)VALUES($1) RETURNING *', [cargo]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear el rol');
    }
}