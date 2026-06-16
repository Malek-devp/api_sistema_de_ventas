
export function adminMiddleware(req, res, next) {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({
                message: 'Acceso denegado'
            });
        }

        next()
    } catch (error) {

    }
}