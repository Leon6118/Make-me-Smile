import { useEffect, useState } from "react";
import { getPagosByTratamiento, createPago, deletePago } from "../services/pagos.service";
import type { Pago, CreatePagoDto } from "../../../types/pagos.types";

export function usePagos(tratamiento_id: string) {
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!tratamiento_id) return;
        setLoading(true);
        const data = await getPagosByTratamiento(tratamiento_id);
        setPagos(data);
        setLoading(false);
    }

    async function crear(payload: CreatePagoDto) {
        await createPago(payload);
        await load();
    }

    async function eliminar(id: string) {
        await deletePago(id);
        await load();
    }

    useEffect(() => {load(); }, [tratamiento_id]);

    return { pagos, loading, crear, eliminar, reload: load };
}
