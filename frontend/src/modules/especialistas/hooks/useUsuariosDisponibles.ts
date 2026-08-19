import { useEffect, useState } from "react";
import { getUsuarios } from "../../usuarios/services/usuarios.service";

/** Usuarios que pueden ser especialistas */
export function useUsuariosDisponibles() {
    const [usuarios, setUsuarios] = useState<any[]>([]);

    async function load() {
        const data = await getUsuarios();
        setUsuarios(data);
    }

    useEffect(() => {load();}, []);

    return { usuarios };
}
