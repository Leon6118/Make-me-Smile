import { createConsultorio, getConsultorios, getConsultorioById, updateConsultorio, deleteConsultorio } from "./consultorios.repository";

export async function createConsultorioService(data: any) {
    return await createConsultorio(data);
}

export async function getConsultoriosService() {
    return await getConsultorios();
}

export async function getConsultorioByIdService(id: string) {
    const consultorio = await getConsultorioById(id);
    if (!consultorio) {
        throw {status: 404, message: "Consultorio no encontrado"};
    } return consultorio;
}

export async function updateConsultorioService(id: string, data: any) {
    return await updateConsultorio(id, data);
}

export async function deleteConsultorioService(id: string) {
    await deleteConsultorio(id);
    return {message: "Consultorio desactivado"};
}
