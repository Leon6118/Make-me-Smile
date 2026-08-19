import { api } from "../../../api/api";
import type { Odontograma, UpsertOdontogramaDto } from "../../../types/odontograma.types";

/** Obtención de odontograma completo */
export async function getOdontogramaByPaciente(paciente_id: string): Promise<Odontograma[]> {
    const { data } = await api.get("/odontograma", { params: { paciente_id } });
    return data.data;
}

/** Creación / actualización (UPSERT) */
export async function upsertOdontograma(payload: UpsertOdontogramaDto): Promise<Odontograma> {
    const { data } = await api.post("/odontograma", payload);
    return data.data;
}

/** Eliminación registro */
export async function deleteOdontograma(id: string): Promise<void> {
    await api.delete(`/odontograma/${id}`);
}
