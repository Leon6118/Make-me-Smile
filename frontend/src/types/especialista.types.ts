export interface Especialista {
    id: string;
    nombre: string;
    email: string;
    especialidad?: string;
    cedula_profesional?: string;
}

export interface CreateEspecialistaDto {
    usuario_id: string;
    especialidad?: string;
    cedula_profesional?: string;
}

export interface UpdateEspecialistaDto {
    especialidad?: string;
    cedula_profesional?: string;
}
