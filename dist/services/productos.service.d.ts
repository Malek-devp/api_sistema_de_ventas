import type { Producto, CrearProducto } from '../interface/productos.interface.js';
export declare function getProductosDB(): Promise<Producto[]>;
export declare function postProductosDB(producto: CrearProducto): Promise<Producto>;
export declare function putProductosDB(id: number, producto: CrearProducto): Promise<Producto | null>;
export declare function deleteProductosDB(id: number): Promise<Producto | null>;
//# sourceMappingURL=productos.service.d.ts.map