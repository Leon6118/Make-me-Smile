import { useHistorialPaciente } from "../hooks/useHistorialPaciente";
import { usePacienteById } from "../../pacientes/hooks/usePacienteById";
import ArchivosPanel from "../../archivos/components/ArchivosPanel";
import TratamientosPanel from "../../tratamientos/components/TratamientosPanel";
import OdontogramaGrid from "../../odontograma/components/OdontogramaGrid";

export default function HistorialTimeline({ paciente_id, onEdit }: any) {
    const { historial } = useHistorialPaciente(paciente_id);
    const { paciente } = usePacienteById(paciente_id);
    const buttonPrimary = {padding: "8px 14px", background: "#bcf7ff", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    
    function getTipoColor(tipo?: string) {
        switch (tipo) {
            case "valoración_inicial": return "#FDE68A";   //return "#A7F3D0";
            case "consulta": return "#BFDBFE";             //return "#BFD8FE";
            case "seguimiento": return "#FCA5A5";          //return "#FDE68A";
            default: return "#E5E7EB";                     //return "#E5E7EB";
        }
    }
    function getTipoLabel(tipo?: string) {
        switch (tipo) {
            case "valoración_inicial": return "🦷 Valoración inicial";
            case "consulta": return "💬 Consulta";
            case "seguimiento": return "📈 Seguimiento";
            default: return "Consulta";
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            {/* ODONTOGRAMA */}
            <div style={{ marginTop: 10, bottom: 0, zIndex: 5 }}>
                <OdontogramaGrid paciente_id={paciente_id} historial_id={historial[0]?.id} tipoPaciente={paciente?.tipo_paciente === "pediatrico" ? "pediatrico" : "adulto"} />
            </div>
            
            {/* TIMELINE */}
            <h3>📜 Historial clínico</h3>
            <div style={{ borderLeft: "3px solid #ccc", paddingLeft: 20}}>
                {historial.map((h) => (
                    <div key={h.id} style={{ marginBottom: 20, position: "relative" }}>

                        {/* Punto timeline*/}
                        <div style={{position: "absolute", left: -10, top: 5, width: 12, height: 12, borderRadius: "50%", background: "#7C3AED" }} />

                        {/* Card */}
                        <div style={{ background: "#f5f3ff", padding: 15, borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)"}}>

                            {/* HEADER */}
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>{new Date(h.fecha).toLocaleString()}</strong>

                                {/* 🏷️ Tipo */}
                                <span style={{ background: getTipoColor(h.tipo), padding: "6px 50px", borderRadius: 20, fontSize: 23 }}>
                                    {getTipoLabel(h.tipo)}
                                </span>                                
                            </div>
                            
                            <p><b>👨‍⚕️ Especialista:</b> {h.especialista_nombre}</p>

                            {/* CITA */}
                            {h.cita_fecha && (
                                <div style={{ background: "#c3bcf8", padding: 10, borderRadius: 8 }}>
                                    <p><b>📅 Cita:</b>{new Date(h.cita_fecha).toLocaleString()}</p>
                                    {h.cita_motivo && <p><b>Motivo:</b>{h.cita_motivo}</p>}
                                    {h.cita_notas && <p><b>Notas:</b>{h.cita_notas}</p>}
                                </div>
                            )}

                            {/* CLÍNICO */}
                            {h.diagnostico && <p><b>🧠 Diagnóstico:</b> {h.diagnostico}</p>}
                            {h.tratamiento && <p><b>💊 Tratamiento:</b> {h.tratamiento}</p>}
                            {h.observaciones && <p><b>📝 Observaciones:</b> {h.observaciones}</p>}

                            {/* TRATAMIENTOS + PAGOS */}
                            <TratamientosPanel historial_id={h.id} paciente_id={h.paciente_id} />
                            {/* Archivos clínicos */}
                            <ArchivosPanel historial_id={h.id} />
                            <button style={buttonPrimary}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                onClick={() => onEdit && onEdit(h)}>✏️ Editar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
