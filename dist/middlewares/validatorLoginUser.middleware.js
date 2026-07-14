export function validatorLoginUser(req, res, next) {
    const { dni } = req.body;
    if (!dni) {
        return res.status(400).json({ error: 'El campo DNI es obligatorio' });
    }
    next();
}
//# sourceMappingURL=validatorLoginUser.middleware.js.map