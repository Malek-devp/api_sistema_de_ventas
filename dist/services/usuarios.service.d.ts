import type { Usuario } from '../interface/usuario.interface.js';
export declare function getUsuariosDB(): Promise<Usuario[]>;
export declare function registerUsuariosDB(nombre: string, dni: string, id_rol: number): Promise<Usuario>;
export declare function getUsuariosByDni(dni: string): Promise<Usuario | null>;
export declare function getUsuariosById(id: number): Promise<Usuario | null>;
export declare function putUsuariosDB(id: number, nombre: string, dni: string, id_rol: number): Promise<Usuario | null>;
export declare function deleteUsuariosDB(id: number): Promise<Usuario | null>;
//# sourceMappingURL=usuarios.service.d.ts.map