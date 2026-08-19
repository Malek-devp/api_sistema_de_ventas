import jwt from 'jsonwebtoken';
import type {IUsuarioRepository} from '../interface/usuario.interface.repositori.js'

export class UsuariosService {

    constructor(private repository: IUsuarioRepository){}

    async findAll(){
        try {
            return this.repository.findAll()
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error}`)
        }
    }

    async findByDni(dni: string){
        try {
            return this.repository.findByDni(dni)
        } catch (error) {
            throw new Error(`Error al obtener el usuario con dni: ${dni}`)
        }
    }

    async findById(id: number){
        try {
            return this.repository.findById(id)
        } catch (error) {
            throw new Error(`Error al obtener el usuario con id: ${id}`)
        }
    }

    async create(nombre: string, dni: string, id_rol: number){
        try {
            return this.repository.create(nombre, dni, id_rol)
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error}`)
        }
    }

    async update(id: number, nombre: string, dni: string, id_rol: number){
        try {
            return this.repository.update(id, nombre, dni, id_rol)
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error}`)
        }
    }

    async delete(id: number){
        try {
            return this.repository.delete(id)
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error}`)
        }
    }

    async login(dni:string){
        try {
            const data = await this.repository.findByDni(dni)
            if(!data){
                throw new Error(`Usuario no encontrado`)
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error(`Configuración del servidor incompleta`);
            }
            const token = jwt.sign(
                {
                    id: data.id,
                    nombre: data.nombre, 
                    rol: data.id_rol
                },
                jwtSecret,
                {
                    expiresIn: '1h'
                }
            );
            return token
        } catch (error) {
            throw new Error(`Lo sentimos ocurrio un erro: ${error}`)
        }
    }
}