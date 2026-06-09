import {Router} from "express";

import {getRoles, postRoles} from "../controllers/roles.controller.js";

const router = Router();

router.get('/', getRoles);
router.post('/register', postRoles);

export default router;