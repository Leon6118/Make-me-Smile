import { pool } from "../../config/database";

export async function createUser(data: any) {
    const query = `INSERT INTO usuarios (clinica_id, nombre, telefono, email, password_hash)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const values = [data.clinica_id,data.nombre,data.telefono,data.email,data.password_hash];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function assingRole(userId: string, roleId: string) {
    const query = `INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES ($1,$2)`;
    await pool.query(query, [userId, roleId]);
}

export async function getRoleIdByName(roleName: string) {
    const query = `SELECT id FROM roles WHERE nombre = $1`;
    const { rows } = await pool.query(query, [roleName]);
    return rows[0];
}

export async function updatePassword(userId: string, passwordHash: string) {
    const query = `UPDATE usuarios SET password_hash = $1, updated_at = now() WHERE id = $2`;
    await pool.query(query, [passwordHash, userId]);
}

export async function getUserByEmail(email: string) {
    const query = `SELECT id,email FROM usuarios WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
}

export async function getUsers() {
    const query = `SELECT u.*, r.id as rol_id, r.nombre as rol_nombre FROM usuarios u
    LEFT JOIN usuarios_roles ur ON u.id=ur.usuario_id LEFT JOIN roles r ON ur.rol_id=r.id
    WHERE u.activo = true ORDER BY u.nombre`;
    const { rows } = await pool.query(query);
    return rows;
}
