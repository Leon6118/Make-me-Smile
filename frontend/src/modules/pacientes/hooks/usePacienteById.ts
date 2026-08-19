import { useEffect, useState } from "react";
import { getPacienteById } from "../services/pacientes.service";
import type { Paciente } from "../../../types/paciente.types";

export function usePacienteById(id: string) {
    const [paciente, setPaciente] = useState<Paciente | null>(null);

    async function load() {
        const data = await getPacienteById(id);
        setPaciente(data);
    }

    useEffect(() => {if (id) load(); }, [id]);

    return { paciente, reload: load};
}
