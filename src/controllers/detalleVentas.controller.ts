import type { Request, Response, NextFunction } from 'express'
import type { crearDetalle } from '../interface/detalleVenta.interface.js'
import { parseId } from '../utils/parseId.js'
import { DetalleVentasService } from '../services/detalleVentas.service.js'

export class DetalleVentasController {
    constructor(private service: DetalleVentasService) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.findAll()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const detalle: crearDetalle = req.body
            const { venta_id, producto_id, precio_unitario, cantidad } = detalle
            const result = await this.service.create(venta_id, producto_id, precio_unitario, cantidad)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async put(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const idParsing = parseId(id)

            const detalle: crearDetalle = req.body

            const { venta_id, producto_id, precio_unitario, cantidad } = detalle
            const result = await this.service.update(idParsing, venta_id, producto_id, precio_unitario, cantidad)

            if(!result) {
                res.status(404).json({ message: 'Detalle de venta no encontrado' })
                return
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
