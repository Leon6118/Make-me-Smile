import { createCita, getCitasByFecha, getCitaById, updateCita, deleteCita, checkDisponibilidadRango, getCitasRangoFecha, getCitasByPaciente } from "./citas.repository";

export async function createCitaService(data: any) {
    const conflicto = await checkDisponibilidadRango(data.especialista_id, data.consultorio_id, data.fecha_hora, data.duracion_minutos || 30);
    if (conflicto.length > 0) {
        throw {status: 400, message: "Conflicto de horario: Especialista o consultorio ocupado en ese horario"};
    }
    return await createCita(data);
}

export async function getAgendaDiaService(fecha: string) {
    return await getCitasByFecha(fecha);
}

export async function getCitaByIdService(id: string) {
    const cita = await getCitaById(id);
    if (!cita) {
        throw {status: 404, message: "Cita no encontrada"};
    }
    return cita;
}

export async function updateCitaService(id: string, data: any) {
    const conflicto = await checkDisponibilidadRango(data.especialista_id, data.consultorio_id, data.fecha_hora, data.duracion_minutos, id);
    if (conflicto.length > 0) {
        throw {status: 400, message: "Conflicto de horario al actualizar la cita"};
    }
    return await updateCita(id, data);
}

export async function deleteCitaService(id: string) {
    await deleteCita(id);
    return { message: "Cita eliminada" };
}

export async function getCitasByPacienteService(paciente_id: string) {
    return await getCitasByPaciente(paciente_id);
}


/** AGENDA INTELIGENTE */

function sumarMinutos(fecha: Date, minutos: number) {
    return new Date(fecha.getTime() + minutos * 60000);
}

function hayTraslape(inicio: Date, fin: Date, cita: any) {
    const citaInicio = new Date(cita.fecha_hora);
    const citaFin = new Date(new Date(cita.fecha_hora).getTime() + cita.duracion_minutos * 60000);
    return (inicio < citaFin && fin > citaInicio);
}

export async function generarAgendaDiaService(fecha: string, duracion_slot: number = 30) {
    const citas = await getCitasRangoFecha(fecha);
    const inicioDia = new Date(`${fecha}T08:00:00`);
    const finDia = new Date(`${fecha}T20:00:00`);
    const agenda: any[] = [];
    let actual = new Date(inicioDia);
    while (actual < finDia) {
        const finSlot = sumarMinutos(actual, duracion_slot);
        const ocupado = citas.some((cita) => hayTraslape(actual, finSlot, cita));
        agenda.push({hora_inicio: actual, hora_fin: finSlot, disponible: !ocupado});
        actual = finSlot;
    } return agenda;
}
