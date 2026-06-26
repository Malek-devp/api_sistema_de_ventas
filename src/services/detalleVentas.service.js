import pool from "../database/db.js";

export const getDetalleVentasDB = async () => {
    try {
        const result = await pool.query('SELECT * FROM detalle_ventas')
        return result.rows
    } catch (error) {
        throw error; // FIX: throw directo, no new Error({message:error}) que produce "[object Object]"
    }
}

export const postDetalleVentasDB = async (venta_id, producto_id, precio_unitario, cantidad) => {

    const client = await pool.connect(); // abrimos una conección unica

    try {
        await client.query('BEGIN'); // Iniciamos la transacción

        //Descontamos el stock en la tabla productos
        const queryStock = `
        UPDATE productos
        SET stock = stock - $1
        WHERE id = $2
        RETURNING stock;`// usamos RETURNING stock para verificar si el inventario quedó en negativo

        const resStock = await client.query(queryStock, [cantidad, producto_id]);

        //validación por seguridad por si no hay suficiente stock
        if(resStock.rows[0].stock < 0){
            throw new Error(`Stock insuficiente para el producto`);
        }

        //insertar en detalle de ventas
        const queryDetalle = `
        INSERT INTO detalle_ventas (venta_id, producto_id, precio_unitario, cantidad)
        VALUES ($1, $2, $3, $4);`;

        await client.query(queryDetalle, [venta_id, producto_id, precio_unitario, cantidad])

        // si todo salió bien, confirmamos los cambios en la base de datos
        await client.query('COMMIT');
        res.status(201).json({
            ok:true,
            msg: "venta registrada e inventario actualizado"
        })

    } catch (error) {
        await client.query('ROOLBACK');
        res.status(400).json({
            ok:false,
            msg:error.message
        })
    }finally{
        //simpre liberar el cliente para que vuelva al pool de conexiones
        client.release();
    }
}
 
// FIX: agregar endpoints faltantes
export const putDetalleVentasDB = async (id, venta_id, producto_id, precio_unitario, cantidad) => {
    try {
        const result = await pool.query('UPDATE detalle_ventas SET venta_id=$1, producto_id=$2, precio_unitario=$3, cantidad=$4 WHERE id=$5 RETURNING *', [venta_id, producto_id, precio_unitario, cantidad, id])
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}
