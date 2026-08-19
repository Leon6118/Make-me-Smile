import { useState } from "react";
import { useOdontograma } from "../hooks/useOdontograma";
import Diente from "./Diente";
import OdontogramaModal from "./OdontogramaModal";
import LeyendaColores from "./LeyendaColores";

interface Props {
    paciente_id: string;
    historial_id: string;
    tipoPaciente?: "pediatrico" | "adulto";
}

const dientesAdulto = {
    sd: ["18","17","16","15","14","13","12","11"],
    si: ["21","22","23","24","25","26","27","28"],
    id: ["48","47","46","45","44","43","42","41"],
    ii: ["31","32","33","34","35","36","37","38"]
};
const dientesNino = {
    sd: ["55","54","53","52","51"],
    si: ["61","62","63","64","65"],
    id: ["85","84","83","82","81"],
    ii: ["71","72","73","74","75"]
};

export default function OdontogramaGrid({ paciente_id, historial_id, tipoPaciente = "pediatrico" }: Props) {
    const { odontograma, guardar } = useOdontograma(paciente_id);
    const [selected, setSelected] = useState<any>(null);
    const [modal, setModal] = useState(false);
    const dientes = tipoPaciente === "adulto" ? dientesAdulto : dientesNino;

    function getDienteData(numero: string) {
        return odontograma.filter((o) => o.diente_numero === numero);
    }

    function handleSelect(numero: string, cara: string | null) {
        setSelected({ numero, cara });
        setModal(true);
    }

    async function handleSave(data: any) {
        if (!selected) return;
        await guardar({paciente_id, diente_numero: selected.numero, cara: selected.cara, ...data});
        setModal(false);
    }

    function renderCuadrante(lista: string[]) {
        return (
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {lista.map((diente) => (
                    <Diente key={diente} numero={diente} datos={getDienteData(diente)} onSelect={(cara) => handleSelect(diente, cara)} />
                ))}
            </div>
        );
    }

    return (
        <div style={{ background: "#fff", padding: 20, borderRadius: 20, position: "relative" }}>
            <h3 style={{ color: "#7C3AED" }}>
                🦷 Odontograma {tipoPaciente === "pediatrico" ? "Infantil" : "Adulto"}
            </h3>
            <LeyendaColores />

            {/* GRID CUADRANTES */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginTop: 20, position: "relative" }}>
                {/* LINEAS CENTRALES */}
                <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 2, background: "#E9D5FF" }} />
                <div style={{ position: "absolute", top: 0, left: "50%", width: 2, height: "100%", background: "#E9D5FF" }} />

                {/* CUADRANTE 1 */}
                <div>
                    <h4 style={{ color: "#A78BFA" }}>Superior Derecho</h4>
                    {renderCuadrante(dientes.sd)}
                </div>
                {/* CUADRANTE 2 */}
                <div>
                    <h4 style={{ color: "#A78BFA" }}>Superior Izquierdo</h4>
                    {renderCuadrante(dientes.si)}
                </div>
                {/* CUADRANTE 4 */}
                <div>
                    <h4 style={{ color: "#A78BFA" }}>Inferior Derecho</h4>
                    {renderCuadrante(dientes.id)}
                </div>
                {/* CUADRANTE 3 */}
                <div>
                    <h4 style={{ color: "#A78BFA" }}>Inferior Izquierdo</h4>
                    {renderCuadrante(dientes.ii)}
                </div>
            </div>
            <OdontogramaModal
                visible={modal}
                onClose={() => setModal(false)}
                onSave={handleSave}
                historial_id={historial_id}
                tipoSeleccion={selected?.cara !== null ? "cara" : "diente"}
            />
        </div>
    );
}
