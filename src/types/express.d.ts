import { JwtPayload } from 'jsonwebtoken';

interface User {
  id: number;
  nombre: string;
  rol: number;
}

//Este bloque de código añade una propiedad personalizada llamada user al objeto de petición (Request) que Express utiliza de forma interna.
declare global {
  namespace Express {
    interface Request {
      // Usamos JwtPayload | string porque es lo que devuelve jwt.verify
      user?: User | JwtPayload | string; 
    }
  }
}
 