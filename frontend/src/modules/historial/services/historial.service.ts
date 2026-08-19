import { api } from "../../../api/api";
import type { HistorialClinico, CreateHistorialDto, UpdateHistorialDto } from "../../../types/historial.types";

/** Obtención de historial por paciente */
export async function getHistorialByPaciente(paciente_id: string): Promise<HistorialClinico[]> {
    const { data } = await api.get("/historial", {params: { paciente_id }});
    return data.data;
}

/** Obtención de registro por ID */
export async function getHistorialById(id: string): Promise<HistorialClinico> {
    const { data } = await api.get(`/historial/${id}`);
    return data.data;
}

/** Creación de registro clínico */
export async function createHistorial(payload: CreateHistorialDto): Promise<HistorialClinico> {
    const { data } = await api.post("/historial", payload);
    return data.data;
}

/** Actualización de registro clínico */
export async function updateHistorial(id: string, payload: UpdateHistorialDto): Promise<HistorialClinico> {
    const { data } = await api.put(`/historial/${id}`, payload);
    return data.data;
}
