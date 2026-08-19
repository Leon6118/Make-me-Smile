import { api } from "../../../api/api";
import type { Rol, CreateRolDto, UpdateRolDto } from "../../../types/rol.types";

/** Obtención de roles */
export async function getRoles(): Promise<Rol[]> {
    const { data } = await api.get("/roles");
    return data.data;
}

/** Creación de rol */
export async function createRol(payload: CreateRolDto): Promise<Rol> {
    const { data } = await api.post("/roles", payload);
    return data.data;
}

/** Actualización de rol */
export async function updateRol(id: string, payload: UpdateRolDto): Promise<Rol> {
    const { data } = await api.put(`/roles/${id}`, payload);
    return data.data;
}

/** Eliminación de rol */
export async function deleteRol(id: string) {
    const { data } = await api.delete(`/roles/${id}`);
    return data.data;
}
