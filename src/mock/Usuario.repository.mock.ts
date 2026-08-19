import type {IUsuarioRepository} from '../interface/usuario.interface.repositori.js'
import type { Usuario } from '../interface/usuario.interface.js'

export class UsuariosRepositoryMock implements IUsuarioRepository {

    async findAll(): Promise<Usuario[]> {
        return [
            { id: 1, nombre: 'Juan', dni: '12345678', id_rol: 1, rol_cargo: 'Admin' },
            { id: 2, nombre: 'Maria', dni: '87654321', id_rol: 2, rol_cargo: 'User' }
        ];
    }

    async findByDni(dni: string): Promise<Usuario | undefined> {
        const usuarios = await this.findAll();
        return usuarios.find(usuario => usuario.dni === dni);
    }

    async findById(id: number): Promise<Usuario | undefined> {
        const usuarios = await this.findAll();
        return usuarios.find(usuario => usuario.id === id);
    }

    async create(nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined> {
        const newUsuario: Usuario = { id: Math.floor(Math.random() * 1000), nombre, dni, id_rol, rol_cargo: 'User' };
        return newUsuario;
    }

    async update(id: number, nombre: string, dni: string, id_rol:number): Promise<Usuario | undefined> {
        const usuario = await this.findById(id);
        if (usuario) {
            usuario.nombre = nombre;
            usuario.dni = dni;
            usuario.id_rol = id_rol;
            return usuario;
        }
        return undefined;
    }

    async delete(id: number): Promise<Usuario | undefined> {
        const usuario = await this.findById(id);
        if (usuario) {
            return usuario;
        }
        return undefined;
    }

}