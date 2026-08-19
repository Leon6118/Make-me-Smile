import { api } from "../../../api/api";
import type { Tratamiento, CreateTratamientoDto, UpdateTratamiento } from "../../../types/tratamientos.types";

/** Obtención de tratamientos por historial */
export async function getTratamientosByHistorial(historial_id: string): Promise<Tratamiento[]> {
    const { data } = await api.get("/tratamientos/by-historial", {params: {historial_id}});
    return data.data;
}

/** Creación de tratamiento */
export async function createTratamiento(payload: CreateTratamientoDto): Promise<Tratamiento> {
    const { data } = await api.post("/tratamientos", payload);
    return data.data;
}

/** Actualización de tratamiento */
export async function updateTratamiento(id: string, payload: UpdateTratamiento): Promise<Tratamiento> {
    const { data } = await api.put(`/tratamientos/${id}`, payload);
    return data.data;
}

/** Eliminación de tratamiento */
export async function deleteTratamiento(id: string): Promise<void> {
    await api.delete(`/tratamientos/${id}`);
}
