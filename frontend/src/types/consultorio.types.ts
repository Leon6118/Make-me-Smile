export interface Consultorio {
    id: string;
    clinica_id: string;
    nombre: string;
    descripcion?: string;
    activo: boolean;
    created_at: string;
    updated_at?: string;
}

export interface CreateConsultorioDto {
    clinica_id: string;
    nombre: string;
    descripcion?: string;
}

export interface UpdateConsultorioDto {
    nombre: string;
    descripcion?: string;
}
