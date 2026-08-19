import { pool } from "../../config/database";

export async function createPago(data: any) {
    const query = `INSERT INTO pagos (tratamiento_id, paciente_id, monto, metodo_pago, referencia_pago, notas)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
    const values = [data.tratamiento_id, data.paciente_id, data.monto, data.metodo_pago, data.referencia_pago || null, data.notas || null];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getPagosByTratamiento(tratamiento_id: string) {
    const query = `SELECT * FROM pagos WHERE tratamiento_id = $1
    ORDER BY fecha_pago DESC`;
    const { rows } = await pool.query(query, [tratamiento_id]);
    return rows;
}

export async function getPagosByPaciente(paciente_id: string) {
    const query = `SELECT p.*, t.nombre AS tratamiento_nombre
    FROM pagos p JOIN tratamientos t ON p.tratamiento_id = t.id
    WHERE p.paciente_id = $1 ORDER BY p.fecha_pago DESC`;
    const { rows } = await pool.query(query, [paciente_id]);
    return rows;
}

export async function getPagoById(id: string) {
    const query = `SELECT * FROM pagos WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function deletePago(id: string) {
    await pool.query(`DELETE FROM pagos WHERE id = $1`, [id]);
}
