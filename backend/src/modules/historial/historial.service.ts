import { createHistorial, getHistorialByPaciente, getHistorialById, updateHistorial } from "./historial.repository";

export async function createHistorialService(data: any) {
    // 🔍 verificar si es el primer historial del paciente
    const historialPrevio = await getHistorialByPaciente(data.paciente_id);
    let tipo = data.tipo;
    if (!tipo) {tipo = historialPrevio.length === 0 ? "valoracion_inicial" : "consulta";}
    return await createHistorial({...data, tipo});
}

export async function getHistorialPacienteService(paciente_id: string) {
    return await getHistorialByPaciente(paciente_id);
}

export async function getHistorialByIdService(id: string) {
    const historial = await getHistorialById(id);
    if (!historial) {
        throw {status: 404, message: "Registro clínico no encontrado"};
    } return historial;
}

export async function updateHistorialService(id: string, data: any) {
    return await updateHistorial(id, data);
}
