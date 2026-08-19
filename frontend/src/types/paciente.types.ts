export interface Paciente {
    id: string;
    clinica_id: string;
    nombre: string;
    fecha_nacimiento: string;
    telefono?: string;
    email?: string;
    notas?: string;
    tipo_paciente?: "pediatrico" | "adulto";
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreatePacienteDto {
    clinica_id: string;
    nombre: string;
    fecha_nacimiento: string;
    telefono?: string;
    email?: string;
    notas?: string;
}

export interface UpdatePacienteDto {
    nombre: string;
    fecha_nacimiento: string;
    telefono?: string;
    email?: string;
    notas?: string;
}
