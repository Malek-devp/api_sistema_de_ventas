export interface Producto{
    id:number;
    marca: string;
    precio: number;
    stock: number;
    id_categoria: number;
}

export type CrearProducto = Omit<Producto, "id">;

export type ActualizarProducto = Omit<Producto, "id">;