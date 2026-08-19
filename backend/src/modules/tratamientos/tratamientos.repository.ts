import { pool } from "../../config/database";

export async function createTratamiento(data: any) {
    const query = `INSERT INTO tratamientos (historial_id, nombre, descripcion, costo, estado)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const values = [data.historial_id, data.nombre, data.descripcion, data.costo, data.estado || "pendiente"];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getTratamientosByHistorial(historial_id: string) {
    const query = `SELECT * FROM tratamientos WHERE historial_id = $1
    ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, [historial_id]);
    return rows;
}

export async function updateTratamiento(id: string, data: any) {
    const query = `UPDATE tratamientos SET nombre=$1, descripcion=$2, costo=$3, estado=$4, updated_at=now()
    WHERE id=$5 RETURNING *`;
    const values = [data.nombre, data.descripcion, data.costo, data.estado, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function deleteTratamiento(id: string) {
    await pool.query(`DELETE FROM tratamientos WHERE id=$1`, [id]);
}
