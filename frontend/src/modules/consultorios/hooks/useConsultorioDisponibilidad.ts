import { useState } from "react";

/** Este hook será clave para agenda después */
export function useConsultorioDisponibilidad() {
    const [consultorioSeleccionado, setConsultorioSeleccionado] = useState<string | null>(null);
    function seleccionarConsultorio(id: string) {setConsultorioSeleccionado(id);}

    return {consultorioSeleccionado, seleccionarConsultorio};
}
