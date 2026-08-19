export interface Tratamiento {
    id: string;
    historial_id: string;
    nombre: string;
    descripcion?: string;
    costo: number;
    estado: "pendiente" | "en_proceso" | "completado";
    created_at: string;
    updated_at?: string;
}

export interface CreateTratamientoDto {
    historial_id: string;
    nombre: string;
    descripcion?: string;
    costo: string;
    estado?: string;
}

export interface UpdateTratamiento {
    nombre?: string;
    descripcion?: string;
    costo?: number;
    estado?: string;
}
