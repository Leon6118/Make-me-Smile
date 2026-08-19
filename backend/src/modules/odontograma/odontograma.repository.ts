import { pool } from "../../config/database";

/** Creación o actualización (UPSERT lógico) */
export async function upsertOdontograma(data: any) {
    const query = `INSERT INTO odontograma (paciente_id, diente_numero, cara, estado, tratamiento_id, notas)
    VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (paciente_id, diente_numero, cara)
    DO UPDATE SET estado = EXCLUDED.estado, tratamiento_id = EXCLUDED.tratamiento_id, notas = EXCLUDED.notas
    RETURNING *`;
    const values = [data.paciente_id, data.diente_numero, data.cara || null, data.estado || null, data.tratamiento_id || null, data.notas || null];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

/** Obtención de odontograma completo por paciente */
export async function getOdontogramaByPaciente(paciente_id: string) {
    const query = `SELECT o.*, t.nombre as tratamiento_nombre FROM odontograma o
    LEFT JOIN tratamientos t ON o.tratamiento_id = t.id WHERE o.paciente_id = $1`;
    const { rows } = await pool.query(query, [paciente_id]);
    return rows;
}

/** Eliminación de registro específico */
export async function deleteOdontograma(id: string) {
    await pool.query(`DELETE FROM odontograma WHERE id = $1`, [id]);
}
