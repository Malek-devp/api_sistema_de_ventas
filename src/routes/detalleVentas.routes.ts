import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js' // FIX: typo en nombre del archivo
import { adminMiddleware } from '../middlewares/adminMiddleware.js' // FIX: agregar adminMiddleware

//controllers
import { getDetalleVentas, postDetalleVentas, putDetalleVentas } from '../controllers/detalleVentas.controller.js' // FIX: agregar put/delete

const router: Router = Router()

router.get('/', authMiddleware, getDetalleVentas);
router.post('/register', authMiddleware, postDetalleVentas);
// FIX: agregar endpoints faltantes
router.put('/:id', authMiddleware, adminMiddleware, putDetalleVentas);

export default router  