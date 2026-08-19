import type { Usuario } from './usuario.interface.js'

export interface IUsuarioRepository {
    findAll(): Promise<Usuario[]>;
    findByDni(dni: string): Promise<Usuario | undefined>;
    findById(id: number): Promise<Usuario | undefined>;
    create(nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined>;
    update(id: number, nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined>;
    delete(id: number): Promise<Usuario | undefined>;
}