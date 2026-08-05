import pool from "../database/db.js";
import type {Usuario} from '../interface/usuario.interface.js'

import * as userRepository from '../repositories/usuarios.repository.js'

export async function getUsuariosDB(){
    try {
        return userRepository.findAll();
    } catch (error) {
        throw new Error("No se pudieron obtener los usuarios");
    }  
} 

export async function getUsuariosByDni(dni: string){
   try {
        return userRepository.findByDni(dni)
   } catch (error) {
        throw new Error(`No se pudo encontrar al usuario ${dni}`)
   }
}

export async function registerUsuariosDB(nombre:string, dni:string, id_rol: number){
    try {
        return userRepository.create(nombre, dni, id_rol)
    } catch (error) {
        throw new Error("Error al registrar al usuario")
    }
}
// CORRECCIÓN: nueva función para buscar por id (la ruta usa :id, no dni)
export async function getUsuariosById(id: number){
   try {
    return userRepository.findById(id)
   } catch (error) {
        throw new Error(`No se pudo encontrar al usuario con id: ${id}`)
   }
}

// CORRECCIÓN: actualizar por id ($4), igual que el módulo de productos y el frontend (PUT /usuarios/:id)
export async function putUsuariosDB(id: number, nombre: string, dni: string, id_rol: number){
   try {
        return userRepository.update(id, nombre, dni, id_rol)
   } catch (error) {
        throw new Error(`No se pudo actualizar al usuario: ${dni}`)
   }
}

// CORRECCIÓN: recibe id numérico; antes el SQL filtraba por id pero se pasaba el dni
export async function deleteUsuariosDB(id: number): Promise<Usuario | null> {
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ?? null;
    } catch (error) {
        throw error;
    }
}
