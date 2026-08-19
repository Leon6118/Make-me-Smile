import { api } from "../../../api/api";
import type { Usuario, CreateUsuarioDto, UpdatePasswordDto } from "../../../types/usuario.types";

/** Obtención de usuarios */
export async function getUsuarios(): Promise<Usuario[]> {
    const { data } = await api.get("/usuarios");
    return data.data;
}

/** Creacion de usuario */
export async function createUsuario(payload: CreateUsuarioDto): Promise<Usuario> {
    const { data } = await api.post("/usuarios", payload);
    return data.data;
}

/** Actualización de contraseña */
export async function updatePassword(payload: UpdatePasswordDto) {
    const { data } = await api.put("/usuarios/password", payload);
    return data.data;
}
