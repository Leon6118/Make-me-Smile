import { api } from "../../../api/api";
import type { Especialista, CreateEspecialistaDto, UpdateEspecialistaDto } from "../../../types/especialista.types";

/** Obtención de especialistas */
export async function getEspecialistas(): Promise<Especialista[]> {
    const { data } = await api.get("/especialistas");
    return data.data;
}

/** Obtención de especialista por ID */
export async function getEspecialistaById(id: string): Promise<Especialista> {
    const { data } = await api.get(`/especialistas/${id}`);
    return data.data;
}

/** Creación de especialista */
export async function createEspecialista(payload: CreateEspecialistaDto): Promise<Especialista> {
    const { data } = await api.post("/especialistas", payload);
    return data.data;
}

/** Actualización de especialista */
export async function updateEspecialista(id: string, payload: UpdateEspecialistaDto): Promise<Especialista> {
    const { data } = await api.put(`/especialistas/${id}`, payload);
    return data.data;
}
