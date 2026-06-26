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
        return rows[0]; // FIX: eliminar console.log de debug
    }catch (error) {
        throw error;
    }
}

// FIX: agregar endpoints faltantes
export async function putUsuariosDB(id, nombre, dni, id_rol) {
    try {
        const result = await pool.query('UPDATE usuarios SET nombre=$1, dni=$2, id_rol=$3 WHERE id=$4 RETURNING *', [nombre, dni, id_rol, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteUsuariosDB(id) {
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}