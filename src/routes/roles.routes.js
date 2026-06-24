import {Router} from "express";

import {getRoles, postRoles} from "../controllers/roles.controller.js";

const router = Router();

router.get('/', getRoles); // obtener todos los roles
router.post('/register', postRoles); // crear un nuevo rol

export default router;