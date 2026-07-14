import { Router } from "express";
//controllers
import { getUsuarios, getUsuarioBy, registerUsuarios, loginUsuarios, me, logoutUsuarios, putUsuarios, deleteUsuarios } from '../controllers/usuarios.controller.js';
//middlewares
import { validatorDataUser } from '../middlewares/validatorDataUser.middleware.js';
import { validatorLoginUser } from '../middlewares/validatorLoginUser.middleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
const router = Router();
// CORRECCIÓN: proteger listado — antes era público
router.get('/', authMiddleware, adminMiddleware, getUsuarios);
// Rutas fijas antes de /:id para que Express no las confunda con un id
router.post('/register', authMiddleware, adminMiddleware, validatorDataUser, registerUsuarios);
router.post('/login', validatorLoginUser, loginUsuarios);
router.post('/logout', logoutUsuarios);
router.get('/dashboard', authMiddleware, adminMiddleware, me);
// CORRECCIÓN: PUT y DELETE con /:id para coincidir con el frontend (api.put/delete `/usuarios/${id}`)
router.put('/:id', authMiddleware, adminMiddleware, putUsuarios);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUsuarios);
// CORRECCIÓN: ruta /:id al final; antes era /usuario/:id y el controller leía params.dni
router.get('/:id', authMiddleware, adminMiddleware, getUsuarioBy);
export default router;
//# sourceMappingURL=usuarios.routes.js.map