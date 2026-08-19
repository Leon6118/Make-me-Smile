import { useAgendaDia } from "../../citas/hooks/useAgendaDia";

export default function AlertasPanel() {
    const hoy = new Date().toISOString().split("T")[0];
    const { citas } = useAgendaDia(hoy);
    const noConfirmadas = citas.filter(c => c.estado === "Programada");

    return (
        <div style={{ background: "#fef3c7", padding: 23, borderRadius: 18 }}>
            <h1>⚠️ Alertas</h1>
            <div style={{ fontSize: 23 }}>
                {noConfirmadas.length > 0 ? (
                    <p>❗ {noConfirmadas.length} citas sin confirmar</p>
                ) : (<p>✅ Todas las citas confirmadas</p>)}
            </div>
            <div style={{ fontSize: 23 }}>
                👶 1 paciente natal - preparar cama
            </div>
        </div>
    );
}
