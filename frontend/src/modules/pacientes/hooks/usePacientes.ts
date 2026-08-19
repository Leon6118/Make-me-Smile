import { useEffect, useState } from "react";
import type { Paciente } from "../../../types/paciente.types";
import { getPacientes, searchPacientes } from "../services/pacientes.service";

export function usePacientes() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadPacientes() {
        setLoading(true);
        const data = await getPacientes();
        setPacientes(data);
        setLoading(false);
    }

    async function buscar(search: string) {
        if (!search) return loadPacientes();
        const data = await searchPacientes(search);
        setPacientes(data);
    }

    useEffect(() => {loadPacientes();}, []);

    return {pacientes, loading, buscar, reload: loadPacientes};
}
