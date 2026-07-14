export function adminMiddleware(req, res, next) {
    try {
        if (req.user.rol !== 1) {
            return res.status(401).json({
                message: 'Acceso denegado'
            });
        }
        next();
    }
    catch (error) {
        next(error); // FIX: catch vacío que tragaba errores, ahora propaga al manejador global
    }
}
//# sourceMappingURL=adminMiddleware.js.map