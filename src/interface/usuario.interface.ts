export interface Usuario {
    id:number,
    nombre:string,
    dni:string,
    id_rol: number,
    rol_cargo?: string
}

export type CrearUsuario = Omit<Usuario, "id">;

export type ActualizarUsuario = Omit<Usuario, "id">;