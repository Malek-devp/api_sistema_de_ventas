import { getProductosDB, postProductosDB, putProductosDB, deleteProductosDB } from '../services/productos.service.js'; // FIX: typo en nombre del archivo
import type { Request, Response, NextFunction } from "express";
import type { Producto, CrearProducto } from '../interface/productos.interface.js';

export async function getProductos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const productos:Producto[] = await getProductosDB();
        res.json(productos);
    } catch (error) { 
        next(error);
    }
}

export async function postProductos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const body:CrearProducto = req.body;
        const result:Producto = await postProductosDB(body);
        res.json(result);
    } catch (error) {
        next(error);
    } 
}

export async function putProductos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const {id} = req.params;
        const body:CrearProducto = req.body;
        const result:Producto = await putProductosDB(Number(id), body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const {id} = req.params;
        const result:Producto = await deleteProductosDB(Number(id));
        res.json(result);
    } catch (error) {
        next(error);
    }
}