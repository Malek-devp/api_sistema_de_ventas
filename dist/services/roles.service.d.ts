import type { Rol, CrearRol } from '../interface/roles.interface.js';
export declare function getRolesDB(): Promise<Rol[]>;
export declare function postRolesDB(cargo: CrearRol['cargo']): Promise<Rol>;
export declare function putRolesDB(id: number, cargo: CrearRol['cargo']): Promise<Rol | null>;
export declare function deleteRolesDB(id: number): Promise<Rol | null>;
//# sourceMappingURL=roles.service.d.ts.map