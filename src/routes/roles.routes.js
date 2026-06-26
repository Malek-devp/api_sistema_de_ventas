import {Router} from "express";

// FIX: agregar middlewares de autenticación
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

import {getRoles, postRoles, putRoles, deleteRoles} from "../controllers/roles.controller.js"; // FIX: agregar put/delete

const router = Router();

router.get('/', authMiddleware, getRoles); // FIX: agregar auth a rutas de roles
router.post('/register', authMiddleware, adminMiddleware, postRoles); // FIX: agregar auth a rutas de roles
// FIX: agregar endpoints faltantes
router.put('/:id', authMiddleware, adminMiddleware, putRoles);
router.delete('/:id', authMiddleware, adminMiddleware, deleteRoles);

export default router;