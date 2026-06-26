import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config({ path: './src/.env' });

import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js'
import detalleVentasRoutes from './routes/detalleVentas.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); // permitir que el frontend acceda a la API

app.use(morgan('dev'));
app.use(cookieParser()); // para manejar las cookies
app.use(express.json());

app.use('/usuarios', usuariosRoutes); // rutas de usuarios
app.use('/roles', rolesRoutes); // rutas de roles
app.use('/productos', productosRoutes); // rutas de productos
app.use('/ventas', ventasRoutes)
app.use('/detalle', detalleVentasRoutes)

// 3. Middleware para capturar rutas no encontradas (404)
app.use((req, res) => {
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

app.listen(PORT, () => { // FIX: usar variable PORT en lugar de hardcodear 2203
    console.log(`\u{1F680} Server is running on port http://localhost:${PORT}`) // FIX: eliminar comilla extra que causaba syntax error
    }
)