import { useEffect, useState } from "react";
import type { Rol } from "../../../types/rol.types";
import { getRoles, deleteRol } from "../services/roles.service";

export function useRoles() {
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadRoles() {
        setLoading(true);
        const data = await getRoles();
        setRoles(data);
        setLoading(false);
    }

    async function remove(id: string) {
        await deleteRol(id);
        await loadRoles();
    }

    useEffect(() => {loadRoles();}, []);

    return {roles, loading, reload: loadRoles, remove};
}
