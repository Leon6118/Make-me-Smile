import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgendaSlots from "../components/AgendaSlots";
import CitaForm from "../components/CitaForm";

export default function CitasPage() {
    const [searchParams] = useSearchParams();
    const paciente_id = searchParams.get("paciente_id");
    const [fecha, setFecha] = useState( new Date().toISOString().split("T")[0]);
    const [selectedHora, setSelectedHora] = useState("");
    const [selectedCita, setSelectedCita] = useState<any>(null);
    const [reload, setReload] = useState(0);
    
    function handleSelectSlot(hora: string) {
        const local = new Date(hora);
        const formatted = local.getFullYear() + "-" +
            String(local.getMonth() + 1).padStart(2, "0") + "-" +
            String(local.getDate()).padStart(2, "0") + "T" +
            String(local.getHours()).padStart(2, "0") + ":" +
            String(local.getMinutes()).padStart(2, "0");
        setSelectedCita(null);
        setSelectedHora(formatted);
    }

    function handleEdit(cita: any) {
        setSelectedHora("");
        setSelectedCita(cita);
    }

    return (
        <div style={{ padding: 30}}>
            <h1>📅 Agenda Clínica</h1>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.currentTarget.value)} />
            {/* Agenda visual */}
            <AgendaSlots fecha={fecha} reload={reload} onSelect={handleSelectSlot} onEdit={handleEdit} />
            {(selectedHora || selectedCita) && (
                <CitaForm 
                    fechaHora={selectedHora}
                    cita={selectedCita}
                    pacientePreseleccionado={paciente_id}
                    onClose={() => {setSelectedHora(""); setSelectedCita(null);}}
                    onSaved={() => setReload(prev => prev + 1)}
                />
            )}
        </div>
    );
}
