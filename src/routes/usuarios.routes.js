import {Router} from "express";

import {getUsuarios, registerUsuarios} from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', getUsuarios);
router.post('/register', registerUsuarios);
//router.post('/login', loginUsuarios);


export default router;