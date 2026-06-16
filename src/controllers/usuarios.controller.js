import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'

import { getUsuariosDB, registerUsuariosDB, getUsuariosByDni } from '../services/usuarios.service.js';


export async function getUsuarios(req, res) {
    try {

        const result = await getUsuariosDB();
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export async function registerUsuarios(req, res) {
    try {
        const { nombre, dni, id_rol } = req.body;
        const result = await registerUsuariosDB(nombre, dni, id_rol);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

export async function loginUsuarios(req, res) {
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
                    rol:usuarios.id_rol
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: '1h' 
                }
            );
            
            const serializedToken = serialize('token', token, { httpOnly: true, maxAge: 3600 })
            res.setHeader('Set-Cookie', serializedToken).json({ message: 'Inicio de sesión exitoso' });

    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}