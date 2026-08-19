import { pool } from "../../config/database";

export async function getClinicas() {
    const query = `SELECT * FROM clinicas WHERE activo = TRUE ORDER BY nombre`;
    const { rows } = await pool.query(query);
    return rows;
}
