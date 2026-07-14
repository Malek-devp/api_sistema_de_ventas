import { Router } from "express";

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

import { getRoles, postRoles, putRoles, deleteRoles } from "../controllers/roles.controller.js";

const router: Router = Router();

router.get('/', authMiddleware, getRoles);
router.post('/register', authMiddleware, adminMiddleware, postRoles);
router.put('/:id', authMiddleware, adminMiddleware, putRoles);
router.delete('/:id', authMiddleware, adminMiddleware, deleteRoles);

export default router;
