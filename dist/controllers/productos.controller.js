import { getProductosDB, postProductosDB, putProductosDB, deleteProductosDB } from '../services/productos.service.js'; // FIX: typo en nombre del archivo
import { parseId } from '../utils/parseId.js';
export async function getProductos(req, res, next) {
    try {
        const productos = await getProductosDB();
        res.json(productos);
    }
    catch (error) {
        next(error);
    }
}
export async function postProductos(req, res, next) {
    try {
        const producto = req.body;
        const result = await postProductosDB(producto);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function putProductos(req, res, next) {
    try {
        const id = req.params.id;
        const idParsing = parseId(id);
        const producto = req.body;
        const result = await putProductosDB(idParsing, producto);
        if (!result) {
            return res.status(400).json({
                error: "Producto no encontrado"
            });
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function deleteProductos(req, res, next) {
    try {
        const id = req.params.id;
        const idParsing = parseId(id);
        const result = await deleteProductosDB(idParsing);
        if (!result) {
            return res.status(400).json({
                error: "Producto no encontrado"
            });
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=productos.controller.js.map