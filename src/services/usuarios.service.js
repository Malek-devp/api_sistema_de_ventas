import pool from "../database/db.js";


export async function getUsuariosDB(){
    try {
        const data = await pool.query('SELECT * FROM usuarios');
        return data.rows;

    } catch (error) {
        throw error;
    }
}

export async function registerUsuariosDB(nombre, dni, id_rol) {
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, dni, id_rol) VALUES ($1, $2, $3) RETURNING *',
            [nombre, dni, id_rol]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export async function getUsuariosByDni(dni) {
    try {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE dni = $1', [dni]);
        console.log(rows);
        return rows[0];
    }catch (error) {
        throw error;
    }
}