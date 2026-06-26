import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({
                message: 'Token requerido'
            })
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decode;

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalido'
        })
    }
}