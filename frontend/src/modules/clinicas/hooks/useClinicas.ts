import { useEffect, useState } from "react";
import type { Clinica } from "../../../types/clinica.types";
import { getClinicas } from "../services/clinicas.service";

export function useClinicas() {
    const [clinicas, setClinicas] = useState<Clinica[]>([]);
    useEffect(() => {loadClinicas();}, []);

    async function loadClinicas() {
        const data = await getClinicas();
        setClinicas(data);
    } return { clinicas };
}
