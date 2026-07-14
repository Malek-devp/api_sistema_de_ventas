import type { Request, Response, NextFunction } from "express";
export function validatorDataUser(req: Request, res: Response, next: NextFunction): void | Response {
    const {nombre, dni, id_rol} = req.body;    
    if (!nombre || !dni || !id_rol) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    if(dni.length !== 8) {
        return res.status(400).json({ error: 'El DNI debe tener 8 caracteres' });
    }
    next();
}