import { api } from "../../../api/api";
import type { Pago, CreatePagoDto } from "../../../types/pagos.types";

/** Obtención de pagos por tratamiento */
export async function getPagosByTratamiento(tratamiento_id: string): Promise<Pago[]> {
    const { data } = await api.get("/pagos/by-tratamiento", {params: { tratamiento_id }});
    return data.data;
}

/** Obtención de pagos por paciente */
export async function getPagosByPaciente(paciente_id: string): Promise<Pago[]> {
    const { data } = await api.get("/pagos/by-paciente", {params: { paciente_id }});
    return data.data;
}

/** Creación de pago */
export async function createPago(payload: CreatePagoDto): Promise<Pago> {
    const { data } = await api.post("/pagos", payload);
    return data.data;
}

/** Eliminación de pago */
export async function deletePago(id: string): Promise<void> {
    await api.delete(`/pagos/${id}`);
}
