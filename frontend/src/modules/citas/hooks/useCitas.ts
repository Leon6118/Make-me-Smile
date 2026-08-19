import { createCita, updateCita, deleteCita } from "../services/citas.service";

export function useCitas() {
    async function create(data: any) {
        return await createCita(data);
    }

    async function update(id: string, data: any) {
        return await updateCita(id, data);
    }

    async function remove(id: string) {
        return await deleteCita(id);
    }

    return { create, update, remove };
}
