import { useEffect, useState } from "react";
import type { Usuario } from "../../../types/usuario.types";
import { getUsuarios } from "../services/usuarios.service";

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadUsuarios() {
        setLoading(true);
        const data = await getUsuarios();
        setUsuarios(data);
        setLoading(false);
    }

    useEffect(() => {loadUsuarios();}, []);

    return {usuarios, loading, reload: loadUsuarios};
}
