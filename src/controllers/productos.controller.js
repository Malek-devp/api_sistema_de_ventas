import { getProductosDB, postProductosDB, putProductosDB, deleteProductosDB } from '../services/productos.service.js'; // FIX: typo en nombre del archivo

export async function getProductos(req, res, next) {
    try {
        const productos = await getProductosDB();
        res.json(productos);
    } catch (error) {
        next(error);
    }
}

export async function postProductos(req, res, next) {
    try {
        const {marca, precio, stock, id_categoria} = req.body;
        const result = await postProductosDB(marca, precio, stock, id_categoria);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function putProductos(req, res, next) {
    try {
        const {id} = req.params;
        const {marca, precio, stock, id_categoria} = req.body;
        const result = await putProductosDB(id, marca, precio, stock, id_categoria);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductos(req, res, next) {
    try {
        const {id} = req.params;
        const result = await deleteProductosDB(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}