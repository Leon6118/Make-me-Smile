import { createPago, getPagosByTratamiento, getPagosByPaciente, getPagoById, deletePago } from "./pagos.repository";

export async function createPagoService(data: any) {
    if (!data.tratamiento_id || !data.paciente_id || !data.monto || !data.metodo_pago) {
        throw { status: 400, message: "Faltan datos obligatorios del pago" };
    }
    return await createPago(data);
}

export async function getPagosByTratamientoService(tratamiento_id: string) {
    return await getPagosByTratamiento(tratamiento_id);
}

export async function getPagosByPacienteService(paciente_id: string) {
    return await getPagosByPaciente(paciente_id);
}

export async function getPagoByIdService(id: string) {
    const pago = await getPagoById(id);
    if (!pago) {
        throw { status: 404, message: "Pago no encontrado" };
    }
    return pago;
}

export async function deletePagoService(id: string) {
    await deletePago(id);
    return { message: "Pago eliminado" };
}
