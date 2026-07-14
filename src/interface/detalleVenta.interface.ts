export interface DetalleVentas {
    id: number,
    venta_id: number,
    producto_id: number,
    precio_unitario: number,
    cantidad: number,
    subtotal: number,
}

export type crearDetalle = Omit<DetalleVentas, 'id' | 'subtotal'> 

export type detalleResponse = {
    ok: boolean;
    msg: string;
  };