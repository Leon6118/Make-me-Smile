import { useEffect, useState } from "react";
import type { Cita } from "../../../types/cita.types";
import { getAgendaDia } from "../services/citas.service";

export function useAgendaDia(fecha: string, reload?: number) {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        const data = await getAgendaDia(fecha);
        setCitas(data);
        setLoading(false);
    }

    useEffect(() => {if (fecha) load();}, [fecha, reload]);

    return { citas, loading, reload: load};
}
