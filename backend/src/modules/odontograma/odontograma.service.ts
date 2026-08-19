import { upsertOdontograma, getOdontogramaByPaciente, deleteOdontograma } from "./odontograma.repository";

export async function upsertOdontogramaService(data: any) {
    if (!data.paciente_id || !data.diente_numero) {
        throw { status: 400, message: "Paciente y diente son obligatorios" };
    } return await upsertOdontograma(data);
}

export async function getOdontogramaPacienteService(paciente_id: string) {
    return await getOdontogramaByPaciente(paciente_id);
}

export async function deleteOdontogramaService(id: string) {
    await deleteOdontograma(id);
    return { message: "Registro eliminado" };
}
