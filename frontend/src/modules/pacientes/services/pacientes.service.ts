import { api } from "../../../api/api";
import type { Paciente, CreatePacienteDto, UpdatePacienteDto } from "../../../types/paciente.types";

/** Obtención de todos los pacientes */
export async function getPacientes(): Promise<Paciente[]> {
    const { data } = await api.get("/pacientes");
    return data.data;
}

/** Busqueda de pacientes (nombre, email o telefono) */
export async function searchPacientes(search: string): Promise<Paciente[]> {
    const { data } = await api.get(`/pacientes/buscar?search=${search}`);
    return data.data;
}

/** Obtención de paciente por ID */
export async function getPacienteById(id: string): Promise<Paciente> {
    const { data } = await api.get(`/pacientes/${id}`);
    return data.data;
}

/** Creación de paciente */
export async function createPaciente(payload: CreatePacienteDto): Promise<Paciente> {
    const { data } = await api.post("/pacientes", payload);
    return data.data;
}

/** Actualización de paciente */
export async function updatePaciente(id: string, payload: UpdatePacienteDto): Promise<Paciente> {
    const { data } = await api.put(`/pacientes/${id}`, payload);
    return data.data;
}
