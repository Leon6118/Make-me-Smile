import { pool } from "../../config/database";

export async function createCita(data: any) {
    const query = `INSERT INTO citas (clinica_id, consultorio_id, especialista_id, paciente_id, fecha_hora, duracion_minutos, estado, motivo_consulta, notas)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
    const values = [data.clinica_id, data.consultorio_id, data.especialista_id, data.paciente_id, data.fecha_hora, data.duracion_minutos || 30, data.estado || "Programada", data.motivo_consulta, data.notas];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getCitasByFecha(fecha: string) {
    const query = `SELECT c.*, p.nombre AS paciente, u.nombre AS especialista, co.nombre AS consultorio
    FROM citas c JOIN pacientes p ON c.paciente_id=p.id JOIN especialistas e ON c.especialista_id=e.id
    JOIN usuarios u ON e.usuario_id=u.id JOIN consultorios co ON c.consultorio_id=co.id
    WHERE DATE(c.fecha_hora) = $1 ORDER BY c.fecha_hora`;
    const { rows } = await pool.query(query, [fecha]);
    return rows;
}

export async function getCitaById(id: string) {
    const query = `SELECT * FROM citas WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function updateCita(id: string, data: any) {
    const query = `UPDATE citas
    SET consultorio_id = $1, especialista_id = $2, paciente_id =$3, fecha_hora = $4, duracion_minutos = $5, estado = $6, motivo_consulta = $7, notas = $8, updated_at = now()
    WHERE id = $9 RETURNING *`;
    const values = [data.consultorio_id, data.especialista_id, data.paciente_id, data.fecha_hora, data.duracion_minutos, data.estado, data.motivo_consulta, data.notas, id];
    const { rows } = await pool.query(query, values);
    return rows [0];
}

export async function deleteCita(id: string) {
    const query = `DELETE FROM citas WHERE id = $1`;
    await pool.query(query, [id]);
}

export async function getCitasByPaciente(paciente_id: string) {
    const query = `SELECT id, fecha_hora, motivo_consulta, notas FROM citas
    WHERE paciente_id = $1 ORDER BY fecha_hora DESC`;
    const { rows } = await pool.query(query, [paciente_id]);
    return rows;
}

/** VALIDACIÓN INTELIGENTE POR RANGOS */

export async function checkDisponibilidadRango(especialista_id: string, consultorio_id: string, fecha_hora: string, duracion_minutos: number, cita_id?: string) {
    const query = `SELECT * FROM citas
    WHERE (especialista_id = $1 OR consultorio_id = $2)
    AND ($3::timestamp < (fecha_hora + (duracion_minutos || ' minutes')::interval)
    AND ($3::timestamp + ($4 || ' minutes')::interval) > fecha_hora)
    ${cita_id ? "AND id <> $5" : ""}`;
    const values = cita_id
    ? [especialista_id, consultorio_id, fecha_hora, duracion_minutos, cita_id]
    : [especialista_id, consultorio_id, fecha_hora, duracion_minutos];
    const { rows } = await pool.query(query, values);
    return rows;
}

export async function getCitasRangoFecha(fecha: string) {
    const query = `SELECT * FROM citas WHERE DATE(fecha_hora) = $1`;
    const { rows } = await pool.query(query, [fecha]);
    return rows;
}
