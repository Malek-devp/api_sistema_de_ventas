import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js' // FIX: typo en nombre del archivo
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

//controllers
import { getProductos, postProductos, putProductos, deleteProductos } from '../controllers/productos.controller.js';

const router = Router();

router.get('/', authMiddleware, getProductos); // obtener todos los productos
router.post('/register', authMiddleware, adminMiddleware, postProductos); // crear un nuevo producto
router.put('/:id', authMiddleware, adminMiddleware, putProductos); // actualizar un producto
router.delete('/:id', authMiddleware, adminMiddleware, deleteProductos); // eliminar un producto

export default router; 