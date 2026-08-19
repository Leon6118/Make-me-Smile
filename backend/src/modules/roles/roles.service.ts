import { createRol, getRoles, getRolById, updateRol, deleteRol } from "./roles.repository";

export async function createRolService(data: any) {
    return await createRol(data);
}

export async function getRolesService() {
    return await getRoles();
}

export async function getRolByIdService(id: string) {
    const rol = await getRolById(id);
    if (!rol) {
        throw {status: 404, message: "Rol no encontrado"};
    } return rol;
}

export async function updateRolService(id: string, data: any) {
    return await updateRol(id, data);
}

export async function deleteRolService(id: string) {
    await deleteRol(id);
    return { message: "Rol eliminado"}
}
