import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);

app.listen(2203, () => {
    console.log('Server is running on port http://localhost:2203');
});