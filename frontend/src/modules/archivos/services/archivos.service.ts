import { api } from "../../../api/api";
import type { ArchivoClinico, CreateArchivoDto, UpdateArchivoDto } from "../../../types/archivos.types";

/** Obtención de archivos por historial */
export async function getArchivosByHistorial(historial_id: string): Promise<ArchivoClinico[]> {
    const { data } = await api.get("/archivos", {params: { historial_id }});
    return data.data;
}

/** Obtención de archivo por ID */
export async function getArchivoById(id: string): Promise<ArchivoClinico> {
    const { data } = await api.get(`/archivos/${id}`);
    return data.data;
}

/** Creación de archivo */
export async function createArchivo(payload: CreateArchivoDto): Promise<ArchivoClinico> {
    const { data } = await api.post("/archivos", payload);
    return data.data;
}

/** Actualización de archivo */
export async function updateArchivo(id: string, payload: UpdateArchivoDto): Promise<ArchivoClinico> {
    const { data } = await api.put(`/archivos/${id}`, payload);
    return data.data;
}

/** Eliminación de archivo */
export async function deleteArchivo(id: string): Promise<void> {
    await api.delete(`/archivos/${id}`);
}
