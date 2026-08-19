import { createPaciente, getPacientes, searchPacientes, getPacienteById, updatePaciente } from "./pacientes.repository";

function calcularTipoPaciente(fecha_nacimiento: string) {
    const hoy = new Date();
    const nacimiento = new Date(fecha_nacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    } return edad < 12 ? "pediatrico" : "adulto";
}

export async function createPacienteService(data: any) {
    const tipo_paciente = calcularTipoPaciente(data.fecha_nacimiento);
    return await createPaciente({...data, tipo_paciente});
}

export async function getPacientesService() {
    return await getPacientes();
}

export async function searchPacientesService(search: string) {
    return await searchPacientes(search);
}

export async function getPacienteByIdService(id: string) {
    const paciente = await getPacienteById(id);
    if (!paciente) {
        throw{status: 404, message: "Paciente no encontrado"};
    } return paciente;
}

export async function updatePacienteService(id: string, data: any) {
    let tipo_paciente;
    if (data.fecha_nacimiento) {
        tipo_paciente = calcularTipoPaciente(data.fecha_nacimiento);
    } return await updatePaciente(id, {...data, tipo_paciente});
}
