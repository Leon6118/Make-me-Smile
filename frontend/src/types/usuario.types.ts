export interface Usuario {
    id: string;
    clinica_id: string;
    nombre:string;
    telefono: string;
    email: string;
    activo: boolean;
    created_at?: string;
    updated_at?: string;
    rol_nombre?: string;
    rol_id?: string;
}

export interface CreateUsuarioDto {
    clinica_id: string;
    nombre: string;
    telefono: string;
    email: string;
    password: string;
    rol: string;
}

export interface UpdatePasswordDto {
    email: string;
    password: string;
}
