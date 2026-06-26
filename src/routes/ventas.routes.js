import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js' // FIX: typo en nombre del archivo
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

//controllers
import { getVentas, postVentas, putVentas, deleteVentas } from '../controllers/ventas.controller.js'; // FIX: agregar delete

const router = Router();

router.get('/', authMiddleware, adminMiddleware, getVentas); // FIX: solo admin puede listar ventas
router.post('/register', authMiddleware, postVentas);
router.put('/:id', authMiddleware, adminMiddleware, putVentas);
// FIX: agregar endpoint faltante
router.delete('/:id', authMiddleware, adminMiddleware, deleteVentas);

export default router;