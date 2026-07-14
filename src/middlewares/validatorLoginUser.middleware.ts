import type { Request, Response, NextFunction } from "express";
export function validatorLoginUser(req: Request, res: Response, next: NextFunction): void | Response {
    const { dni } = req.body;   
    if (!dni) {
        return res.status(400).json({ error: 'El campo DNI es obligatorio' });
    }
    next();
}