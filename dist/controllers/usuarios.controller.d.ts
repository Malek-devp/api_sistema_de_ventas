import type { Request, Response, NextFunction } from 'express';
export declare function getUsuarios(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getUsuarioBy(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
export declare function registerUsuarios(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function loginUsuarios(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
export declare function me(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function logoutUsuarios(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function putUsuarios(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
export declare function deleteUsuarios(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
//# sourceMappingURL=usuarios.controller.d.ts.map