import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'

import { getUsuariosDB, registerUsuariosDB, getUsuariosByDni, putUsuariosDB, deleteUsuariosDB } from '../services/usuarios.service.js'; // FIX: agregar put/delete


export async function getUsuarios(req, res, next) {
    try {

        const result = await getUsuariosDB();
        res.json(result);

    } catch (error) {
        next(error)
    }
}

export async function registerUsuarios(req, res, next) {
    try {
        const { nombre, dni, id_rol } = req.body;
        const result = await registerUsuariosDB(nombre, dni, id_rol);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

export async function loginUsuarios(req, res, next) {
    try {
        const { dni } = req.body;
        const usuarios = await getUsuariosByDni(dni);
        
        if (!usuarios) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign(
            {
                id: usuarios.id,
                nombre: usuarios.nombre,
                rol: usuarios.id_rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const serializedToken = serialize(
            'token',
            token,
            {
                httpOnly: true, 
                sameSite: 'lax',
                path: '/',
                maxAge: 3600
            }
        )
        res.setHeader('Set-Cookie', serializedToken).json({ message: 'Inicio de sesión exitoso' });

    } catch (error) {
        next(error)
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
    } catch (error) {
        next(error)
    }
}

// FIX: agregar logout que borra la cookie
export async function logoutUsuarios(req, res, next) {
    try {
        const serializedToken = serialize('token', '', {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 0
        });
        res.setHeader('Set-Cookie', serializedToken).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        next(error);
    }
}

// FIX: agregar endpoints faltantes
export async function putUsuarios(req, res, next) {
    try {
        const {id} = req.params;
        const {nombre, dni, id_rol} = req.body;
        const result = await putUsuariosDB(id, nombre, dni, id_rol);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteUsuarios(req, res, next) {
    try {
        const {id} = req.params;
        const result = await deleteUsuariosDB(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}