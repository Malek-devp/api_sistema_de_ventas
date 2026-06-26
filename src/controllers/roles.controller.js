// FIX: eliminar import no usado de cookieParser
import { getRolesDB, postRolesDB, putRolesDB, deleteRolesDB } from '../services/roles.service.js'; // FIX: agregar put/delete

export async function getRoles(req, res, next) { // FIX: agregar next
    try {
        const roles = await getRolesDB();
        res.json(roles);
    } catch (error) {
        next(error); // FIX: usar manejador global de errores
    }
}

export async function postRoles(req, res, next) { // FIX: agregar next
    try {
        const {cargo} = req.body;
        const result = await postRolesDB(cargo);
        res.json({message: 'Rol creado exitosamente', rol: result});
    } catch (error) {
        next(error); // FIX: usar manejador global de errores
    }
}

// FIX: agregar endpoints faltantes
export async function putRoles(req, res, next) {
    try {
        const {id} = req.params;
        const {cargo} = req.body;
        const result = await putRolesDB(id, cargo);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteRoles(req, res, next) {
    try {
        const {id} = req.params;
        const result = await deleteRolesDB(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}