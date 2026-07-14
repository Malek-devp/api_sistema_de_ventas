export interface Producto{
    id:number;
    marca: string;
    precio: number;
    stock: number;
    id_categoria: number;
    categoria_nombre?: string;
}

export type CrearProducto = Omit<Producto, "id">;

export type ActualizarProducto = Omit<Producto, "id">;