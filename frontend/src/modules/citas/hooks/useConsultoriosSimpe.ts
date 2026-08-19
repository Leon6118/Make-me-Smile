import { useEffect, useState } from "react";
import { getConsultorios } from "../../consultorios/services/consultorios.service";

export function useConsultoriosSimple() {
    const [consultorios, setConsultorios] = useState<any[]>([]);

    useEffect(() => {getConsultorios().then(setConsultorios);}, []);

    return { consultorios };
}
