export interface Rol {
    id: string;
    nombre: string;
    descripcion?: string;
}

export interface CreateRolDto {
    nombre: string;
    descripcion?: string;
}

export interface UpdateRolDto {
    nombre: string;
    descripcion?: string;
}
