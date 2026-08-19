import { pool } from "../../config/database";

export async function findUserByEmail(email: string) {
    const query = `SELECT u.id, u.nombre, u.email, u.password_hash, r.nombre as rol
    FROM usuarios u JOIN usuarios_roles ur ON u.id=ur.usuario_id JOIN roles r ON ur.rol_id=r.id
    WHERE u.email = $1 AND u.activo = true`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
}
