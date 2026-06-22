
export function adminMiddleware(req, res, next) {
    try {
        if (req.user.rol !== 1) {
            return res.status(403).json({
                message: 'Acceso denegado'
            });
        }
        next()
    } catch (error) {

    }
}