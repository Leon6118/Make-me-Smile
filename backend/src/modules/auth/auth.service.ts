import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByEmail } from "./auth.repository";

export async function loginService(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw {status:401, message: "Credenciales inválidas"};
    }
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
        throw {status:401, message: "Credenciales inválidas"};
    }

    const token = jwt.sign(
        {userId: user.id, rol: user.rol},
        process.env.JWT_SECRET as string,
        {expiresIn: "8h"}
    );

    return {token, user: {id: user.id, nombre: user.nombre, email: user.email, rol: user.rol}};
}
