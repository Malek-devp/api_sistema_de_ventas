import {getDetalleVentasDB, postDetalleVentasDB, putDetalleVentasDB, deleteDetalleVentasDB} from '../services/detalleVentas.service.js' // FIX: agregar put/delete

export const getDetalleVentas = async (req, res, next) => {
    try {
        const result = await getDetalleVentasDB()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const postDetalleVentas = async(req, res, next) => {
    try {
        const {venta_id, producto_id, precio_unitario, cantidad} = req.body
        const result = await postDetalleVentasDB(venta_id, producto_id, precio_unitario, cantidad)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

// FIX: agregar endpoints faltantes
export const putDetalleVentas = async (req, res, next) => {
    try {
        const {id} = req.params
        const {venta_id, producto_id, precio_unitario, cantidad} = req.body
        const result = await putDetalleVentasDB(id, venta_id, producto_id, precio_unitario, cantidad)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const deleteDetalleVentas = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await deleteDetalleVentasDB(id)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}