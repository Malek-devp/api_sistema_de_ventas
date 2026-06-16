import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config({ path: './src/.env' });

import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);

// 3. Middleware para capturar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `No se encontró la ruta: ${req.originalUrl}`
    });
});

// 4. Middleware global de manejo de errores (500)
app.use((err, req, res, next) => {
    console.error('💥 ERROR INTERNO:', err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Ocurrió un error interno en el servidor'
    });
});

const PORT = process.env.PORT || 2203

app.listen(2203, () => {
    console.log(` 🚀 Server is running on port http://localhost:${PORT}')`)
    }
)