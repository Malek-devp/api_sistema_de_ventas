import {Router} from "express";

//controllers
import {getUsuarios, registerUsuarios, loginUsuarios} from '../controllers/usuarios.controller.js';

//middlewares
import {validatorDataUser} from '../middlewares/validatorDataUser.middleware.js';
import {validatorLoginUser} from '../middlewares/validatorLoginUser.middleware.js';

const router = Router();

router.get('/', getUsuarios);
router.post('/register', validatorDataUser, registerUsuarios);
router.post('/login', validatorLoginUser, loginUsuarios);


export default router;