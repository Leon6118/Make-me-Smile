import { useEffect, useState } from "react";
import type { Especialista } from "../../../types/especialista.types";
import { getEspecialistas } from "../services/especialistas.service";

export function useEspecialistas() {
    const [especialistas, setEspecialistas] = useState<Especialista[]> ([]);
    const [loading, setLoading] = useState(false);

    async function loadEspecialistas() {
        setLoading(true);
        const data = await getEspecialistas();
        setEspecialistas(data);
        setLoading(false);
    }

    useEffect(() => {loadEspecialistas(); }, []);

    return { especialistas, loading, reload: loadEspecialistas};
}
