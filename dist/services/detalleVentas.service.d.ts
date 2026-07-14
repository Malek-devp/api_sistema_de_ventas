import type { DetalleVentas, detalleResponse } from '../interface/detalleVenta.interface.js';
export declare const getDetalleVentasDB: () => Promise<DetalleVentas[]>;
export declare const postDetalleVentasDB: (venta_id: number, producto_id: number, precio_unitario: number, cantidad: number) => Promise<detalleResponse>;
export declare const putDetalleVentasDB: (id: number, venta_id: number, producto_id: number, precio_unitario: number, cantidad: number) => Promise<DetalleVentas>;
//# sourceMappingURL=detalleVentas.service.d.ts.map