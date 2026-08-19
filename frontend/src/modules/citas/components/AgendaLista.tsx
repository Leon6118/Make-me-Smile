import { useAgendaDia } from "../hooks/useAgendaDia";

export default function AgendaLista({ fecha }: any) {
    const { citas } = useAgendaDia(fecha);

    return (
        <div style={{ marginTop: 20}}>
            <h3>Citas del día</h3>
            {citas.map((c) => (
                <div key={c.id} style={{border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 8}}>
                    <strong>{c.paciente}</strong> - {c.especialista}
                    <br />
                    {new Date(c.fecha_hora).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})} ({c.duracion_minutos} min)
                </div>
            ))}
        </div>
    );
}
