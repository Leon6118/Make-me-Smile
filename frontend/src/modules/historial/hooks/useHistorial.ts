import { createHistorial, updateHistorial } from "../services/historial.service";

export function useHistorial() {
    async function create(data: any) {
        return await createHistorial(data);
    }

    async function update(id: string, data: any) {
        return await updateHistorial(id, data);
    }

    return {create, update};
}
