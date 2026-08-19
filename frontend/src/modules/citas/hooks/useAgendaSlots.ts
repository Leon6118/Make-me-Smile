import { useEffect, useState } from "react";
import type { AgendaSlot } from "../../../types/cita.types";
import { getAgendaSlots } from "../services/citas.service";

export function useAgendaSlots(fecha: string, duracion: number) {
    const [slots, setSlots] = useState<AgendaSlot[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        const data = await getAgendaSlots(fecha, duracion);
        setSlots(data);
        setLoading(false);
    }

    useEffect(() => {if (fecha) load();}, [fecha, duracion]);

    return {slots, loading, reload: load};
}
