import { getVentasDB, postVentasDB, putVentasDB} from '../services/ventas.service.js'; // FIX: agregar delete

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
        const result = await putVentasDB(id)
        res.json(result)
    } catch (error) {
        next(error)
    }
}
