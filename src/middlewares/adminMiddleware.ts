import type { Request, Response, NextFunction } from "express";
import type { User } from "../types/express.js";

export function adminMiddleware(req: Request, res: Response, next: NextFunction): void | Response {
    try {
        if ((req.user as User).rol !== 1) {
            return res.status(401).json({
                message: 'Acceso denegado'
            });
        }
        next()
    } catch (error) {
        next(error) // FIX: catch vacío que tragaba errores, ahora propaga al manejador global
    }
}