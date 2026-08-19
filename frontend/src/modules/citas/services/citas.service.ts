import { api } from "../../../api/api";
import type { Cita, CreateCitaDto, UpdateCitaDto, AgendaSlot } from "../../../types/cita.types";

/** Obtención de agenda del día (citas reales) */
export async function getAgendaDia(fecha: string): Promise<Cita[]> {
    const { data } = await api.get("/citas/agenda", {params: { fecha }});
    return data.data;
}

/** Obtención de slots disponibles (agenda inteligente) */
export async function getAgendaSlots(fecha: string, duracion: number=30): Promise<AgendaSlot[]> {
    const { data } = await api.get("/citas/agenda-slots", {params: { fecha, duracion }});
    return data.data;
}

/** Creación de cita */
export async function createCita(payload: CreateCitaDto): Promise<Cita> {
    const { data } = await api.post("/citas", payload);
    return data.data;
}

/** Actualización de cita */
export async function updateCita(id: string, payload: UpdateCitaDto): Promise<Cita> {
    const { data } = await api.put(`/citas/${id}`, payload);
    return data.data;
}

/** Eliminación de cita */
export async function deleteCita(id: string) {
    const { data } = await api.delete(`/citas/${id}`);
    return data.data;
}

/** Obtención de citas por paciente */
export async function getCitasByPaciente(paciente_id: string) {
    const { data } = await api.get("/citas/by-paciente", {
        params: { paciente_id }
    }); return data.data;
}
