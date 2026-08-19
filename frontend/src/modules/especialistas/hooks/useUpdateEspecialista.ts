import { updateEspecialista } from "../services/especialistas.service";

export function useUpdateEspecialista() {
    async function update(id: string, data: any) {
        return await updateEspecialista(id, data);
    }

    return { update };
}
