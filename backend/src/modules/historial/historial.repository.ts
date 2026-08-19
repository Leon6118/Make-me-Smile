import { pool } from "../../config/database";

export async function createHistorial(data: any) {
    const query = `INSERT INTO historial_clinico (paciente_id, especialista_id, cita_id, motivo_consulta, diagnostico, tratamiento, observaciones, fecha, tipo)
    VALUES ($1,$2,$3,$4,$5,$6,$7, NOW(), $8) RETURNING *`;
    const values = [data.paciente_id, data.especialista_id, data.cita_id || null, data.motivo_consulta || null, data.diagnostico || null, data.tratamiento || null, data.observaciones || null, data.tipo || "consulta"];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getHistorialByPaciente(paciente_id: string) {
    const query = `SELECT h.*, p.nombre AS paciente_nombre , u.nombre AS especialista_nombre,
    c.fecha_hora AS cita_fecha, c.motivo_consulta AS cita_motivo, c.notas AS cita_notas
    FROM historial_clinico h JOIN pacientes p ON h.paciente_id = p.id
    JOIN especialistas e ON h.especialista_id=e.id JOIN usuarios u ON e.usuario_id=u.id
    LEFT JOIN citas c ON h.cita_id = c.id
    WHERE h.paciente_id = $1 ORDER BY h.fecha DESC`;
    const { rows } = await pool.query(query, [paciente_id]);
    return rows;
}

export async function getHistorialById(id: string) {
    const query = `SELECT h.*, p.nombre AS paciente_nombre, u.nombre AS especialista_nombre,
    c.fecha_hora AS cita_fecha, c.motivo_consulta AS cita_motivo, c.notas AS cita_notas
    FROM historial_clinico h JOIN pacientes p ON h.paciente_id = p.id
    JOIN especialistas e ON h.especialista_id=e.id JOIN usuarios u ON e.usuario_id=u.id
    LEFT JOIN citas c ON h.cita_id=c.id WHERE h.id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows [0];
}

export async function updateHistorial(id: string, data: any) {
    const query = `UPDATE historial_clinico
    SET motivo_consulta= $1, diagnostico = $2, tratamiento =$3, observaciones = $4, updated_at = now() WHERE id= $5 RETURNING *`;
    const values = [data.motivo_consulta || null, data.diagnostico || null, data.tratamiento || null, data.observaciones || null, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}
