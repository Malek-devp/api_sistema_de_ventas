import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'

import type {Request, Response, NextFunction} from 'express'
import type {CrearUsuario, ActualizarUsuario} from '../interface/usuario.interface.js'

import { parseId } from '../utils/parseId.js';

export class UsuariosController {
    constructor(private service: UsuariosService){}

    async getUsuarios(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const result = await this.service.findAll()
            if(!result){
                return res.status(404).json({
                    error:'No se encontraron usuarios'
                })
            }
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async getUsuarioByDni(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const dni = req.params.dni
            const result = await this.service.findByDni(dni)
            if(!result){
                // CORRECCIÓN: 404 cuando no existe, en lugar de 400
                return res.status(404).json({
                    error:`Usuario no encontrado con dni: ${dni}`
                })
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getUsuarioById(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const id = parseId(req.params.id)
            const result = await this.service.findById(id)
            if(!result){
                return res.status(404).json({
                    error:`Usuario no encontrado con id: ${id}`
                })
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async createUsuario(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const usuario:CrearUsuario = req.body
            const {nombre, dni, id_rol} = usuario
            const result = await this.service.create(nombre, dni, id_rol)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async loginUsuario(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const dni:string = req.body.dni
            const result = await this.service.login(dni)
            if (!result) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Configuración del servidor incompleta' });
        }

        const token = jwt.sign(
            {
                id: result.id,
                nombre: result.nombre, 
                rol: result.id_rol
            },
            jwtSecret,
            {
                expiresIn: '1h'
            }
        );

        const serializedToken = serialize(
            'token',
            token,
            {
                httpOnly: true, 
                sameSite: 'lax',
                path: '/',
                maxAge: 3600
            }
        )
        res.setHeader('Set-Cookie', serializedToken).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            next(error)
        }
    }

    async me(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Token requerido' });
            }
            return res.json(req.user);
        } catch (error) {
            next(error)
        }
    }

    async logoutUsuario(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const serializedToken = serialize('token', '', {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                maxAge: 0
            });
            res.setHeader('Set-Cookie', serializedToken).json({ message: 'Sesión cerrada exitosamente' });
        } catch (error) {
            next(error)
        }
    }

    async updateUsuario(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const id = parseId(req.params.id)
            const usuario:ActualizarUsuario = req.body
            const {nombre, dni, id_rol} = usuario
            const result = await this.service.update(id, nombre, dni, id_rol)
            if(!result){
                return res.status(404).json({
                    error:`Usuario no encontrado con id: ${id}`
                })
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async deleteUsuario(req:Request, res:Response, next:NextFunction):Promise<Response|void> {
        try {
            const id = parseId(req.params.id)
            const result = await this.service.delete(id)
            if(!result){
                return res.status(404).json({
                    error:`Usuario no encontrado con id: ${id}`
                })
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
