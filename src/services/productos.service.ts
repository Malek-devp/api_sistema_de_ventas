import type { ProductosRepository } from '../repositories/productos.repository.js'
import type { CrearProducto } from '../interface/productos.interface.js'

export class ProductosService {
    constructor(private repository: ProductosRepository) { }

    async findAllProductos() {
        try {
            const result = this.repository.findAllProductos();
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error}`);
        }
    }
 
    async create(producto:CrearProducto){
        try {
            const result = this.repository.create(producto)
            return result
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error}`);
        } 
    }

    async update(id: number, producto: CrearProducto){
        try{
            const result = this.repository.update(id, producto);
            return result;
        }catch(error){
            throw new Error(`Error al actualizar el producto: ${error}`);
        }
    }

    async delete(id:number){
        try{
            const result = this.repository.delete(id)
            return result
        }catch(error){
            throw new Error(`Error al eliminar el producto: ${error}`)
        }
    }
}
