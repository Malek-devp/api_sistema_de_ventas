export interface Rol {
    id: number;
    cargo: string;
}

export type CrearRol = Omit<Rol, "id">;

export type ActualizarRol = Omit<Rol, "id">;
