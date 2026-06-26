import { Router } from "express";

//controllers
import { getUsuarios, registerUsuarios, loginUsuarios, me, logoutUsuarios, putUsuarios, deleteUsuarios } from '../controllers/usuarios.controller.js'; // FIX: agregar put/delete

//middlewares
import { validatorDataUser } from '../middlewares/validatorDataUser.middleware.js';
import { validatorLoginUser } from '../middlewares/validatorLoginUser.middleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js' // FIX: typo en nombre del archivo
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

const router = Router(); 

router.get('/', getUsuarios);
router.post('/register', validatorDataUser, registerUsuarios);
router.post('/login', validatorLoginUser, loginUsuarios);
router.post('/logout', logoutUsuarios); // FIX: ruta para cerrar sesion y borrar cookie
router.get('/dashboard', authMiddleware, adminMiddleware, me)

// FIX: agregar endpoints faltantes
router.put('/:id', authMiddleware, adminMiddleware, putUsuarios);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUsuarios);

export default router; 