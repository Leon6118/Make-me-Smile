import { createEspecialista, getEspecialistas, getEspecialistaById, updateEspecialista } from "./especialistas.repository";

export async function createEspecialistaService(data: any) {
    const especialista = await createEspecialista(data);
    return especialista;
}

export async function getEspecialistasService() {
    return await getEspecialistas();
}

export async function getEspecialistaByIdService(id: string) {
    const especialista = await getEspecialistaById(id);
    if (!especialista) {
        throw {status: 404, message: "Especialista no encontrado"};
    } return especialista;
}

export async function updateEspecialistaService(id: string, data: any) {
    const especialista = await updateEspecialista(id, data);
    return especialista;
}
