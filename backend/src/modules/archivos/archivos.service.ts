import { createArchivo, getArchivosByHistorial, getArchivoById, updateArchivo, deleteArchivo } from "./archivos.repository";

export async function createArchivoService(data: any) {
    return await createArchivo(data);
}

export async function getArchivosByHistorialService(historial_id: any) {
    return await getArchivosByHistorial(historial_id);
}

export async function getArchivoByIdService(id: string) {
    const archivo = await getArchivoById(id);
    if (!archivo) {
        throw {status: 404, message: "Archivo no encontrado"};
    } return archivo;
}

export async function updateArchivoService(id: string, data: any) {
    return await updateArchivo(id, data);
}

export async function deleteArchivoService(id: string) {
    await deleteArchivo(id);
    return { message: "Archivo eliminado" };
}
