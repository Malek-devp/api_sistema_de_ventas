import { getProductosDB, postProductosDB, putProductosDB, deleteProductosDB } from '../services/productos.service.js'; // FIX: typo en nombre del archivo
import type { Request, Response, NextFunction } from "express";
import type { Producto, CrearProducto } from '../interface/productos.interface.js';
import {parseId} from '../utils/parseId.js'

export async function getProductos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const productos = await getProductosDB();
        res.json(productos);
    } catch (error) { 
        next(error);
    }
}

export async function postProductos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const producto:CrearProducto = req.body;
        const result = await postProductosDB(producto);
        res.json(result);
    } catch (error) {
        next(error);
    } 
}

export async function putProductos(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
        const id = req.params.id;
        const idParsing = parseId(id)
        const producto:CrearProducto = req.body;
        const result = await putProductosDB(idParsing, producto);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id;
        const idParsing = parseId(id)
        const result = await deleteProductosDB(idParsing);
        res.json(result);
    } catch (error) {
        next(error);
    }
}