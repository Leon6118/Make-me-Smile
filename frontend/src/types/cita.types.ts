export type EstadoCita = "Programada" | "Confirmada" | "Cancelada";

export interface Cita {
    id: string;
    clinica_id: string;
    consultorio_id: string;
    especialista_id: string;
    paciente_id: string;
    fecha_hora: string;
    duracion_minutos: number;
    estado: EstadoCita;
    motivo_consulta?: string;
    notas?: string;
    paciente?: string;
    especialista?: string;
    consultorio?: string;
}

export interface CreateCitaDto {
    clinica_id: string;
    consultorio_id: string;
    especialista_id: string;
    paciente_id: string;
    fecha_hora: string;
    duracion_minutos?: number;
    estado?: string;
    motivo_consulta?: string;
    notas?: string;
}

export interface UpdateCitaDto extends CreateCitaDto {}

export interface AgendaSlot {
    hora_inicio: string;
    hora_fin: string;
    disponible: boolean;
}
