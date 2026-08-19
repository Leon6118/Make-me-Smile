import { useAgendaSlots } from "../hooks/useAgendaSlots";
import { useAgendaDia } from "../hooks/useAgendaDia";

export default function AgendaSlots({ fecha, onSelect, onEdit, reload }: any) {
    const { slots } = useAgendaSlots(fecha, 30);
    const { citas } = useAgendaDia(fecha, reload);

    function getCitaEnSlot(slot: any) {
        return citas.find((c) => {
            const inicio = new Date(c.fecha_hora);
            const fin = new Date(inicio.getTime() + c.duracion_minutos * 60000);
            const slotInicio = new Date(slot.hora_inicio);
            const slotFin = new Date(slot.hora_fin);

            return slotInicio < fin && slotFin > inicio;
        });
    }

    function getColorByEstado(cita: any) {
        if (!cita) return "#d4edda";    
        switch (cita.estado) {
            case "Confirmada": return "#bfdbfe";
            case "Programada": default: return "#c6c2e3";
        }
    }

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 23, marginTop:10}}>
            {slots.map((s, i) => {
                const cita = getCitaEnSlot(s);
                return (
                    <div
                        key={i}
                        onClick={() => {if (cita) onEdit(cita); else if (s.disponible) onSelect(s.hora_inicio);}}
                        style={{padding: 10, borderRadius: 12, cursor: "pointer", background: getColorByEstado(cita), border: "1px solid #ccc", transition: "0.2s", transform: "scale(1)" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        {/* CARD */}
                        {cita ? (
                            <div style={{ fontSize: 18 }} >
                                {new Date (s.hora_inicio).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                                <span style={{ 
                                    display: "inline-block",
                                    marginTop: 6,
                                    padding: "6px 9px",
                                    borderRadius: 6,
                                    fontSize: 15,
                                    background: cita.estado === "Confirmada" ? "#3b82f6" : "#8b5cf6",
                                    color: "#fff" }}>{cita.estado}
                                </span><br />
                                <strong>{cita.paciente}</strong><br />
                                <strong><small>{cita.consultorio}</small></strong>
                                <div style={{ marginTop: 4 }}>{cita.motivo_consulta || "Sin motivo"}</div>
                                <small>{cita.notas || ""}</small>
                            </div>
                        ) : (<div>
                                {new Date (s.hora_inicio).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})} <br />
                                Disponible
                            </div>)}
                    </div>
                );
            })}
        </div>
    );
}
