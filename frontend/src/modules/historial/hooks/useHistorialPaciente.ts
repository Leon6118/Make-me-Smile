import { useEffect, useState } from "react";
import { getHistorialByPaciente } from "../services/historial.service";
import type { HistorialClinico } from "../../../types/historial.types";

export function useHistorialPaciente(paciente_id: string) {
    const [historial, setHistorial] = useState<HistorialClinico[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!paciente_id) return;

        setLoading(true);
        const data = await getHistorialByPaciente(paciente_id);
        setHistorial(data);
        setLoading(false);
    }

    useEffect(() => {load();}, [paciente_id]);

    return {historial, loading, reload: load};
}
