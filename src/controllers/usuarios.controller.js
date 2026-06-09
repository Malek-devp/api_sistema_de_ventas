import jwt from 'jsonwebtoken';
import {serialize} from 'cookie'

import { getUsuariosDB, registerUsuariosDB } from '../services/usuarios.service.js';


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
        const {nombre, dni, id_rol} = req.body;
        const result = await registerUsuariosDB(nombre, dni, id_rol);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}