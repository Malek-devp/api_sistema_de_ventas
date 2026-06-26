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

// FIX: agregar endpoints faltantes
export async function putRolesDB(id, cargo) {
    try {
        const result = await pool.query('UPDATE roles SET cargo=$1 WHERE id=$2 RETURNING *', [cargo, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al actualizar el rol');
    }
}

export async function deleteRolesDB(id) {
    try {
        const result = await pool.query('DELETE FROM roles WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al eliminar el rol');
    }
}