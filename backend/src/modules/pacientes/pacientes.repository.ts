import { pool } from "../../config/database";

export async function createPaciente(data: any) {
    const query = `INSERT INTO pacientes (clinica_id, nombre, fecha_nacimiento, telefono, email, notas, tipo_paciente)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const values = [data.clinica_id, data.nombre, data.fecha_nacimiento, data.telefono, data.email, data.notas, data.tipo_paciente];
    const { rows } = await pool.query(query, values);
    return rows [0];
}

export async function getPacientes() {
    const query = `SELECT * FROM pacientes WHERE activo = true ORDER BY created_at DESC`;
    const { rows } = await pool.query(query);
    return rows;
}

export async function searchPacientes(search: string) {
    const query = `SELECT * FROM pacientes WHERE activo = true
    AND (LOWER(nombre) LIKE LOWER($1) or TELEFONO like $1 OR LOWER(email) LIKE LOWER($1))
    ORDER BY nombre`;
    const value = [`%${search}%`];
    const { rows } = await pool.query(query, value);
    return rows;
}

export async function getPacienteById(id: string) {
    const query = `SELECT * FROM pacientes WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function updatePaciente(id: string, data: any) {
    const query = `UPDATE pacientes SET nombre = $1, fecha_nacimiento = $2, telefono = $3, email = $4, notas = $5, tipo_paciente = $6, updated_at = now()
    WHERE id = $7 RETURNING *`;
    const values = [data.nombre, data.fecha_nacimiento, data.telefono, data.email, data.notas, data.tipo_paciente, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}
