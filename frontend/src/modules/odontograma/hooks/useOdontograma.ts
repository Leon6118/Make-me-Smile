import { useEffect, useState } from "react";
import { getOdontogramaByPaciente, upsertOdontograma, deleteOdontograma } from "../services/odontograma.service";
import type { Odontograma, UpsertOdontogramaDto, CaraDiente } from "../../../types/odontograma.types";

export function useOdontograma(paciente_id: string) {
    const [odontograma, setOdontograma] = useState<Odontograma[]>([]);
    const [loading, setLoading] = useState(false);

    /** 🔄 Carga de datos */
    async function load() {
        if (!paciente_id) return;
        setLoading(true);
        const data = await getOdontogramaByPaciente(paciente_id);
        setOdontograma(data);
        setLoading(false);
    }

    /** 🦷 Almacenamiento / actualización de cara del diente  */
    async function guardar(data: UpsertOdontogramaDto) {
        await upsertOdontograma(data);
        await load();
    }

    /** ❌ Borrado */
    async function eliminar(id: string) {
        await deleteOdontograma(id);
        await load();
    }

    /** 🔍 Obtención de estado de una cara específica */
    function getEstado(
        diente: string, cara?: CaraDiente
    ): Odontograma | undefined {
        return odontograma.find((o) => o.diente_numero === diente && (o.cara || null) === (cara || null));
    }

    /** 🎨 Obteneción de color directo (para UI) */
    function getColorEstado(estado?: string) {
        switch (estado) {
            case "sano": return "#4ade80";          //verde
            case "caries": return "#f87171";        //rojo
            case "restaurado": return "#60a5fa";    //azul
            case "ausente": return "#9ca3af";       //gris
            case "endodoncia": return "#c084fc";    //morado
            default: return "#e5e7eb"               // neutro
        }
    }

    useEffect(() => { load(); }, [paciente_id]);

    return { odontograma, loading, guardar, eliminar, reload: load, getEstado, getColorEstado };
}
