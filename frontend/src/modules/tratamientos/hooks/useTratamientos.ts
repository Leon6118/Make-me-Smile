import { useEffect, useState } from "react";
import { getTratamientosByHistorial, createTratamiento, updateTratamiento, deleteTratamiento } from "../services/tratamientos.service";
import type { Tratamiento, CreateTratamientoDto, UpdateTratamiento } from "../../../types/tratamientos.types";

export function useTratamientos(historial_id: string) {
    const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!historial_id) return;
        setLoading(true);
        const data = await getTratamientosByHistorial(historial_id);
        setTratamientos(data);
        setLoading(false);
    }

    async function crear(payload: CreateTratamientoDto) {
        await createTratamiento(payload);
        await load();
    }

    async function actualizar(id: string, payload: UpdateTratamiento) {
        await updateTratamiento(id, payload);
        await load();
    }

    async function eliminar(id: string) {
        await deleteTratamiento(id);
        await load();
    }

    useEffect(() => {load(); }, [historial_id]);

    return { tratamientos, loading, crear, actualizar, eliminar, reload: load};
}
