import { getRolesDB, postRolesDB, putRolesDB, deleteRolesDB } from '../services/roles.service.js';
import type { Request, Response, NextFunction } from "express";
import { parseId } from '../utils/parseId.js';

export async function getRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const roles = await getRolesDB();
        res.json(roles);
    } catch (error) {
        next(error);
    }
}

export async function postRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { cargo } = req.body;
        const result = await postRolesDB(cargo);
        res.json({ message: 'Rol creado exitosamente', rol: result });
    } catch (error) {
        next(error);
    }
}

export async function putRoles(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const id = parseId(req.params.id);
        const { cargo } = req.body;
        const result = await putRolesDB(id, cargo);
        if (!result) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteRoles(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const id = parseId(req.params.id);
        const result = await deleteRolesDB(id);
        if (!result) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
