import { api } from "../../../api/api";
import type { Consultorio, CreateConsultorioDto, UpdateConsultorioDto } from "../../../types/consultorio.types";

/** Obtención de todos los consultorios */
export async function getConsultorios(): Promise<Consultorio[]> {
    const { data } = await api.get("/consultorios");
    return data.data;
}

/** Obtención de consultorio por ID */
export async function getConsultorioById(id: string): Promise<Consultorio> {
    const { data } = await api.get(`/consultorios/${id}`);
    return data.data;
}

/** Creación de consultorio */
export async function createConsultorio(payload: CreateConsultorioDto): Promise<Consultorio> {
    const { data } = await api.post("/consultorios", payload);
    return data.data;
}

/** Actualización de consultorio */
export async function updateConsultorio(id: string, payload: UpdateConsultorioDto): Promise<Consultorio> {
    const { data } = await api.put(`/consultorios/${id}`, payload);
    return data.data;
}

/** Eliminación de consultorio */
export async function deleteConsultorio(id: string) {
    const { data } = await api.delete(`/consultorios/${id}`);
    return data.data;
}
