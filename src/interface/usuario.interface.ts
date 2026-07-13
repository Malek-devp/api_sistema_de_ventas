export interface Usuario {
    id:number,
    nombre:string,
    dni:string,
    id_rol: number
}

export type CrearUsuario = Omit<Usuario, "id">;

export type ActualizarUsuario = Omit<Usuario, "id">;