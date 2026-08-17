import type { Request, Response, NextFunction } from 'express'
import { parseId } from '../utils/parseId.js'
import type {VentasService} from '../services/ventas.service.js'

export class VentasController {
    constructor(private service: VentasService) {}

    async get(req: Request, res: Response, next: NextFunction){
        try{
            const ventas = await this.service.findAll();
            res.json(ventas);
        }catch(error){
            next(error);
        }
    }

    async post(req: Request, res: Response, next: NextFunction){
        try{
            const { id_usuario } = req.body;
            const idParsing = parseId(id_usuario)
            const result = await this.service.create(idParsing);
            res.json(result);
        }catch(error){
            next(error);
        }
    }

    async put(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params;
            const idParsing = parseId(id)
            const result = await this.service.update(idParsing);
            
            res.json(result);
        }catch(error){
            next(error);
        }
    }
}


