import { getVentasDB, postVentasDB, putVentasDB, deleteVentasDB } from '../services/ventas.service.js'; // FIX: agregar delete

export async function getVentas(req, res, next) {
    try {
        const ventas = await getVentasDB();
        res.json(ventas);
    } catch (error) {
        next(error);
    }
}

export async function postVentas(req, res, next) {
    try {
        const {id_usuario, fecha, subtotal, igv, total} = req.body;
        const result = await postVentasDB(id_usuario, fecha, subtotal, igv, total);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function putVentas(req, res, next){
    try {
        const {id} = req.params
        const {id_usuario, fecha, subtotal, igv, total} = req.body;
        const result = await putVentasDB(id, id_usuario, fecha, subtotal, igv, total)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

// FIX: agregar endpoint faltante
export async function deleteVentas(req, res, next) {
    try {
        const {id} = req.params;
        const result = await deleteVentasDB(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}