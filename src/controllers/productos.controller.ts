import type { Request, Response, NextFunction } from "express";
import type { CrearProducto } from '../interface/productos.interface.js';
import {parseId} from '../utils/parseId.js'
import type { ProductosService } from '../services/productos.service.js';

export class ProductosController{
    constructor(private service: ProductosService) { }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const productos = this.service.findAllProductos();
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }

    async post(req:Request, res:Response, next:NextFunction){
        try{
            const producto: CrearProducto = req.body;
            const result = this.service.create(producto);
            res.json(result);
        }catch(error){
            next(error);
        }
    }

    async put(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id;
            const idParsing = parseId(id)

            const producto: CrearProducto = req.body;
            const result = this.service.update(idParsing, producto);

            if(!result){
                return res.status(400).json({
                    error: "Producto no encontrado"
                })
            }
            res.json(result);
        }catch(error){
            next(error);
        }
    }

    async delete(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id;
            const idParsing = parseId(id)
            const result = this.service.delete(idParsing);
            if(!result){
                return res.status(400).json({
                    error: "Producto no encontrado"
                })
            }
            res.json(result);
        }catch(error){
            next(error)
        }
    }
}