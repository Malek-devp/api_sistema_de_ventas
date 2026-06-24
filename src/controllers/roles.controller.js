import cookieParser from 'cookie-parser';

import { getRolesDB, postRolesDB } from '../services/roles.service.js';

export async function getRoles(req, res) {
    try {
        const roles = await getRolesDB();
        res.json(roles);
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        res.status(500).json({ message: 'Error al obtener los roles' });
    }
}

export async function postRoles(req, res) {
    try {
        const {cargo} = req.body;
        const result = await postRolesDB(cargo);
        res.json({message: 'Rol creado exitosamente', rol: result});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rol' });
    }
}