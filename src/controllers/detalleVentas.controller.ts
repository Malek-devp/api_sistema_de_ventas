import type { Request, Response, NextFunction } from 'express'
import type { crearDetalle } from '../interface/detalleVenta.interface.js'
import {parseId} from '../utils/parseId.js'

import { getDetalleVentasDB, postDetalleVentasDB, putDetalleVentasDB } from '../services/detalleVentas.service.js' // FIX: agregar put/delete

export const getDetalleVentas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getDetalleVentasDB()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const postDetalleVentas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const detalle:crearDetalle = req.body
        const {venta_id, producto_id, precio_unitario, cantidad} = detalle
        const result = await postDetalleVentasDB(venta_id, producto_id, precio_unitario, cantidad)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

// FIX: agregar endpoints faltantes
export const putDetalleVentas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const idParsing = parseId(id)
        const detalle:crearDetalle = req.body
        const { venta_id, producto_id, precio_unitario, cantidad } = detalle
        const result = await putDetalleVentasDB(idParsing, venta_id, producto_id, precio_unitario, cantidad)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}