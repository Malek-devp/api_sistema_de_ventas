import type {DetalleVentas, detalleResponse} from '../interface/detalleVenta.interface.js'
import { DetalleVentasRepository } from '../repositories/detalleventas.repository.js'

export class DetalleVentasService {
    constructor(private repository: DetalleVentasRepository) {}

    async findAll(){
        return this.repository.findAll()
    }

    async create(venta_id: number, producto_id: number, precio_unitario: number, cantidad: number): Promise<detalleResponse> {
        return this.repository.create(venta_id, producto_id, precio_unitario, cantidad)
    }

    async update(id: number, venta_id: number, producto_id: number, precio_unitario: number, cantidad: number): Promise<DetalleVentas> {
        return this.repository.update(id, venta_id, producto_id, precio_unitario, cantidad)
    }
} 