import bcrypt from "bcrypt";
import { createUser, assingRole, getRoleIdByName, updatePassword, getUserByEmail, getUsers } from "./usuarios.repository";

export async function createUserService(data: any) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await createUser({...data, password_hash: passwordHash});
    const role = await getRoleIdByName(data.rol);
    await assingRole(user.id, role.id);
    return user;
}

export async function updatePasswordService(email: string, newPassword: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw {status: 401, message: "Usuario no encontrado"};
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await updatePassword(user.id, passwordHash);
    return {message: "Contraseña actualizada"};
}

export async function getUsersService() {
    return await getUsers();
}
