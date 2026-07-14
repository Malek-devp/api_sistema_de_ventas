import type { Request, Response, NextFunction } from 'express'

import { parseId } from '../utils/parseId.js'

import { getVentasDB, postVentasDB, putVentasDB } from '../services/ventas.service.js'; // FIX: agregar delete

export async function getVentas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ventas = await getVentasDB();
        res.json(ventas);
    } catch (error) {
        next(error);
    }
}

export async function postVentas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id_usuario } = req.body;
        const idParsing = parseId(id_usuario)
        const result = await postVentasDB(idParsing);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function putVentas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params
        const idParsing = parseId(id)
        const result = await putVentasDB(idParsing)
        res.json(result)
    } catch (error) {
        next(error)
    }
}
