import type { Ventas, AnularVentaResponse } from '../interface/venta.interface.js';
export declare function getVentasDB(): Promise<Ventas[]>;
export declare function postVentasDB(id_usuario: number): Promise<Ventas>;
export declare function putVentasDB(id: number): Promise<AnularVentaResponse>;
//# sourceMappingURL=ventas.service.d.ts.map