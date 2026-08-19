import { useEffect, useState } from "react";
import { getPacientes } from "../../pacientes/services/pacientes.service";

export function usePacientesSimple() {
    const [pacientes, setPacientes] = useState<any[]>([]);
    useEffect(() => {getPacientes().then(setPacientes);}, []);

    return { pacientes };
}
