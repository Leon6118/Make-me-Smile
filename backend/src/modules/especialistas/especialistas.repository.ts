import { pool } from "../../config/database";

export async function createEspecialista(data: any) {
    const query = `INSERT INTO especialistas (usuario_id, especialidad, cedula_profesional)
    VALUES ($1,$2,$3) RETURNING *`;
    const values = [data.usuario_id, data.especialidad, data.cedula_profesional];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getEspecialistas() {
    const query = `SELECT e.id, e.usuario_id, u.nombre, u.email, e.especialidad, e.cedula_profesional
    FROM especialistas e JOIN usuarios u ON e.usuario_id = u.id WHERE e.activo = true`;
    const { rows } = await pool.query(query);
    return rows;
}

export async function getEspecialistaById(id: string) {
    const query = `SELECT e.id, e.usuario_id, u.nombre, u.email, e.especialidad, e.cedula_profesional
    FROM especialistas e JOIN usuarios u ON e.usuario_id = u.id WHERE e.id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows [0];
}

export async function updateEspecialista(id: string, data: any) {
    const query = `UPDATE especialistas SET especialidad = $1, cedula_profesional = $2
    WHERE id = $3 RETURNING *`;
    const { rows } = await pool.query(query, [data.especialidad, data.cedula_profesional, id]);
    return rows[0];
}
