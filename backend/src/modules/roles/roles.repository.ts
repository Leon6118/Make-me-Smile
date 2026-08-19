import { pool } from "../../config/database";

/** Creación de rol */
export async function createRol(data: any) {
    const query = `INSERT INTO roles (nombre, descripcion) VALUES ($1, $2) RETURNING *`;
    const values = [data.nombre, data.descripcion];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

/** Obtención de todos los roles */
export async function getRoles() {
    const query = `SELECT * FROM roles ORDER BY nombre`;
    const { rows } = await pool.query(query);
    return rows;
}

/** Obtención de rol por ID */
export async function getRolById(id: string) {
    const query = `SELECT * FROM roles WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

/** Actualización de rol */
export async function updateRol(id: string, data: any) {
    const query = `UPDATE roles SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *`;
    const values = [data.nombre, data.descripcion, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

/** Eliminación de rol (hard delete) */
export async function deleteRol(id: string) {
    const query = `DELETE FROM roles WHERE id = $1`;
    await pool.query(query, [id]);
}
