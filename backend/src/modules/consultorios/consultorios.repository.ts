import { pool } from "../../config/database";

export async function createConsultorio(data: any) {
    const query = `INSERT INTO consultorios (clinica_id, nombre, descripcion)
    VALUES ($1,$2,$3) RETURNING *`;
    const values = [data.clinica_id, data.nombre, data.descripcion];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getConsultorios() {
    const query = `SELECT * FROM consultorios WHERE activo = true ORDER BY nombre`;
    const { rows } = await pool.query(query);
    return rows;
}

export async function getConsultorioById(id: string) {
    const query = `SELECT * FROM consultorios WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function updateConsultorio(id: string, data: any) {
    const query = `UPDATE consultorios SET nombre = $1, descripcion = $2, updated_at = now() WHERE id = $3 RETURNING *`;
    const values = [data.nombre, data.descripcion, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function deleteConsultorio(id: string) {
    const query = `UPDATE consultorios SET activo = false, updated_at = now() WHERE id = $1`;
    await pool.query(query, [id]);
}
