import { useEffect, useState } from "react";
import { getArchivosByHistorial, createArchivo, updateArchivo, deleteArchivo } from "../services/archivos.service";
import type { ArchivoClinico, CreateArchivoDto, UpdateArchivoDto } from "../../../types/archivos.types";

export function useArchivos(historial_id: string) {
    const [archivos, setArchivos] = useState<ArchivoClinico[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!historial_id) return;
        setLoading(true);
        const data = await getArchivosByHistorial(historial_id);
        setArchivos(data);
        setLoading(false);
    }

    async function crear(payload: CreateArchivoDto) {
        await createArchivo(payload);
        await load();
    }

    async function actualizar(id: string, payload: UpdateArchivoDto) {
        await updateArchivo(id, payload);
        await load();
    }

    async function eliminar(id: string) {
        await deleteArchivo(id);
        await load();
    }

    useEffect(() => {load(); }, [historial_id]);

    return {archivos, loading, crear, actualizar, eliminar, reload: load}
}
