import { useEffect, useState } from "react";
import type { Consultorio } from "../../../types/consultorio.types";
import { getConsultorios, deleteConsultorio } from "../services/consultorios.service";

export function useConsultorios() {
    const [consultorios, setConsultorios] = useState<Consultorio[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadConsultorios() {
        setLoading(true);
        const data = await getConsultorios();
        setConsultorios(data);
        setLoading(false);
    }

    async function remove(id: string) {
        await deleteConsultorio(id);
        await loadConsultorios();
    }

    useEffect(() => {loadConsultorios(); }, []);

    return {consultorios, loading, reload: loadConsultorios, remove};
}
