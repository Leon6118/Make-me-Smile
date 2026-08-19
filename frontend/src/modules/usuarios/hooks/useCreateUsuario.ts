import { createUsuario } from "../services/usuarios.service";

export function useCreateUsuario() {
    async function create(data: any) {
        return await createUsuario(data);
    }

    return { create };
}
