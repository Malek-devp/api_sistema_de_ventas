import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getUsuariosDB, registerUsuariosDB, getUsuariosByDni, getUsuariosById, putUsuariosDB, deleteUsuariosDB } from '../services/usuarios.service.js';
import { parseId } from '../utils/parseId.js';
export async function getUsuarios(req, res, next) {
    try {
        const result = await getUsuariosDB();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function getUsuarioBy(req, res, next) {
    try {
        // CORRECCIÓN: la ruta define :id pero antes se leía req.params.dni (siempre undefined)
        const id = parseId(req.params.id);
        const result = await getUsuariosById(id);
        if (!result) {
            // CORRECCIÓN: 404 cuando no existe, en lugar de 400
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function registerUsuarios(req, res, next) {
    try {
        const usuario = req.body;
        const { nombre, dni, id_rol } = usuario;
        const result = await registerUsuariosDB(nombre, dni, id_rol);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function loginUsuarios(req, res, next) {
    try {
        const dni = req.body.dni;
        const usuarios = await getUsuariosByDni(dni);
        if (!usuarios) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // CORRECCIÓN: validar JWT_SECRET en runtime, no solo con el operador !
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Configuración del servidor incompleta' });
        }
        const token = jwt.sign({
            id: usuarios.id,
            nombre: usuarios.nombre,
            rol: usuarios.id_rol
        }, jwtSecret, {
            expiresIn: '1h'
        });
        const serializedToken = serialize('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 3600
        });
        res.setHeader('Set-Cookie', serializedToken).json({ message: 'Inicio de sesión exitoso' });
    }
    catch (error) {
        next(error);
    }
}
export async function me(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: 'Token requerido'
            });
        }
        return res.json(req.user);
    }
    catch (error) {
        next(error);
    }
}
export async function logoutUsuarios(req, res, next) {
    try {
        const serializedToken = serialize('token', '', {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 0
        });
        res.setHeader('Set-Cookie', serializedToken).json({ message: 'Sesión cerrada exitosamente' });
    }
    catch (error) {
        next(error);
    }
}
export async function putUsuarios(req, res, next) {
    try {
        // CORRECCIÓN: el frontend envía PUT /usuarios/:id — tomar id de la URL, no solo del body
        const id = parseId(req.params.id);
        const user = req.body;
        const { nombre, dni, id_rol } = user;
        const result = await putUsuariosDB(id, nombre, dni, id_rol);
        if (!result) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function deleteUsuarios(req, res, next) {
    try {
        // CORRECCIÓN: el frontend envía DELETE /usuarios/:id — usar id, no dni del body
        const id = parseId(req.params.id);
        const result = await deleteUsuariosDB(id);
        if (!result) {
            return res.status(404).json({
                error: `Usuario no encontrado: ${id}`
            });
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=usuarios.controller.js.map