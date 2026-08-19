import { useEffect, useState } from "react";
import { getCitasByPaciente } from "../services/citas.service";

export function useCitasPaciente(paciente_id: string) {
    const [citas, setCitas] = useState<any[]>([]);

    useEffect(() => {if (!paciente_id) return;
        getCitasByPaciente(paciente_id).then(setCitas);
    }, [paciente_id]);
    return { citas };
}
