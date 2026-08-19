import { useEffect, useState } from "react";
import { getEspecialistas } from "../../especialistas/services/especialistas.service";

export function useEspecialistasSimple() {
    const [especialistas, setEspecialistas] = useState<any[]>([]);

    useEffect(() => {getEspecialistas().then(setEspecialistas);}, []);

    return { especialistas };
}
