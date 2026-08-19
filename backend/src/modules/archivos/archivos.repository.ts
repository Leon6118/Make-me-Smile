import { pool } from "../../config/database";

export async function createArchivo(data: any) {
    const query = `INSERT INTO archivos_clinicos
    (historial_id, nombre_archivo, tipo_archivo, ruta_archivo, descripcion)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const values = [data.historial_id, data.nombre_archivo, data.tipo_archivo, data.ruta_archivo, data.descripcion];
    const { rows } = await pool.query(query, values);
    return rows [0];
}

export async function getArchivosByHistorial(historial_id: string) {
    const query = `SELECT * FROM archivos_clinicos WHERE historial_id = $1 ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, [historial_id]);
    return rows;
}

export async function getArchivoById(id: string) {
    const query = `SELECT * FROM archivos_clinicos WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function updateArchivo(id: string, data: any) {
    const query = `UPDATE archivos_clinicos
    SET nombre_archivo = $1, tipo_archivo = $2, ruta_archivo = $3, descripcion = $4
    WHERE id = $5 RETURNING *`;
    const values = [data.nombre_archivo, data.tipo_archivo, data.ruta_archivo, data.descripcion, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function deleteArchivo(id: string) {
    const query = `DELETE FROM archivos_clinicos WHERE id = $1`;
    await pool.query(query, [id]);
}
