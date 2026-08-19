import { createTratamiento, getTratamientosByHistorial, updateTratamiento, deleteTratamiento } from "./tratamientos.repository";

export async function createTratamientoService(data: any) {
    return await createTratamiento(data);
}

export async function getTratamientosByHistorialService(historial_id: string) {
    return await getTratamientosByHistorial(historial_id);
}

export async function updateTratamientoService(id: string, data: any) {
    return await updateTratamiento(id, data);
}

export async function deleteTratamientoService(id: string) {
    await deleteTratamiento(id);
    return { message: "Tratamiento eliminado" };
}
