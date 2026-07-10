import {Pool} from 'pg';

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'api_sistema_de_ventas',
    password: process.env.DB_PASSWORD || 'malek2003',
    port: Number(process.env.DB_PORT) || 5432,
});

export default pool;