export interface ArchivoClinico {
    id: string;
    historial_id: string;
    nombre_archivo: string;
    tipo_archivo?: string;
    ruta_archivo: string;
    descripcion?: string;
    created_at: string;
}

/** DTOs */
export interface CreateArchivoDto {
    historial_id: string;
    nombre_archivo: string;
    tipo_archivo?: string;
    ruta_archivo: string;
    descripcion?: string;
}

export interface UpdateArchivoDto {
    nombre_archivo?: string;
    tipo_archivo?: string;
    ruta_archivo?: string;
    descripcion?: string;
}
