import pool from "../database/db.js";
export async function getUsuariosDB() {
    try {
        const data = await pool.query(`SELECT u.*, r.cargo AS rol_cargo
             FROM usuarios u
             INNER JOIN roles r ON u.id_rol = r.id`);
        return data.rows;
    }
    catch (error) {
        throw error;
    }
}
export async function registerUsuariosDB(nombre, dni, id_rol) {
    try {
        const result = await pool.query('INSERT INTO usuarios (nombre, dni, id_rol) VALUES ($1, $2, $3) RETURNING *', [nombre, dni, id_rol]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}
export async function getUsuariosByDni(dni) {
    try {
        const { rows } = await pool.query(`SELECT u.*, r.cargo AS rol_cargo
             FROM usuarios u
             INNER JOIN roles r ON u.id_rol = r.id
             WHERE u.dni = $1`, [dni]);
        return rows[0] ?? null;
    }
    catch (error) {
        throw error;
    }
}
// CORRECCIÓN: nueva función para buscar por id (la ruta usa :id, no dni)
export async function getUsuariosById(id) {
    try {
        const { rows } = await pool.query(`SELECT u.*, r.cargo AS rol_cargo
             FROM usuarios u
             INNER JOIN roles r ON u.id_rol = r.id
             WHERE u.id = $1`, [id]);
        return rows[0] ?? null;
    }
    catch (error) {
        throw error;
    }
}
// CORRECCIÓN: actualizar por id ($4), igual que el módulo de productos y el frontend (PUT /usuarios/:id)
export async function putUsuariosDB(id, nombre, dni, id_rol) {
    try {
        const result = await pool.query('UPDATE usuarios SET nombre = $1, dni = $2, id_rol = $3 WHERE id = $4 RETURNING *', [nombre, dni, id_rol, id]);
        return result.rows[0] ?? null;
    }
    catch (error) {
        throw error;
    }
}
// CORRECCIÓN: recibe id numérico; antes el SQL filtraba por id pero se pasaba el dni
export async function deleteUsuariosDB(id) {
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ?? null;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=usuarios.service.js.map