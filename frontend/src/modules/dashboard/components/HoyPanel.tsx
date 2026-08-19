import { useAgendaDia } from "../../citas/hooks/useAgendaDia";

export default function HoyPanel() {
    const hoy = new Date().toISOString().split("T")[0];
    const { citas } = useAgendaDia(hoy);

    function getColor(estado: string) {
        if (estado === "Confirmada") return "#bffbfe";
        return "#ddd6fe";
    }

    return (
        <div style={{ background: "#fff", padding: 20, borderRadius: 16 }}>
            <h1>📅 Citas de hoy</h1>
            {citas.map((c) => (
                <div key={c.id} style={{ padding: 10, marginTop: 10, borderRadius: 10, background: getColor(c.estado), display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18 }}>
                    <div>
                        <strong>{c.paciente}</strong><br />
                        <small>{new Date(c.fecha_hora).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</small>
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                        {c.estado === "Programada" && (<button>Confirmar</button>)}
                        <button>Iniciar</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
