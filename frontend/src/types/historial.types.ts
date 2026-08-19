export interface HistorialClinico {
    id: string;
    paciente_id: string;
    especialista_id: string;
    cita_id?: string;
    fecha: string;
    motivo_consulta?: string;
    diagnostico?: string;
    tratamiento?: string;
    observaciones?: string;
    paciente_nombre?: string;
    especialista_nombre?: string;
    cita_fecha?: string;
    cita_motivo?: string;
    cita_notas?: string;
    tipo?: "valoracion_inicial" | "consulta" | "seguimiento";
}

export interface CreateHistorialDto {
    paciente_id: string;
    especialista_id: string;
    cita_id?: string;
    motivo_consulta?: string;
    diagnostico?: string;
    tratamiento?: string;
    observaciones?: string;
}

export interface UpdateHistorialDto {
    motivo_consulta?: string;
    diagnostico?: string;
    tratamiento?: string;
    observaciones?: string;
}
