import { createEspecialista } from "../services/especialistas.service";

export function useCreateEspecialista() {
    async function create(data: any) {
        return await createEspecialista(data);
    }

    return { create };
}
