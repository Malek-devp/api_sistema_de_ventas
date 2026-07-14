type Estado = 'Anulada' | 'Activa'

export interface Ventas {
    id: number,
    id_usuario: number,
    fecha: Date | string,
    estado: Estado,
    subtotal: number,
    igv: number,
    total: number,
    usuario_nombre?: string
}

export type CrearVentaDto = Pick<Ventas, 'id_usuario'>;

export type AnularVentaResponse = {
  ok: boolean;
  msg: string;
};