import { useAgendaDia } from "../../citas/hooks/useAgendaDia";

function Card({ titulo, valor }: any) {
    return (
        <div style={{ background: "#fff", padding: 15, borderRadius: 12 }}>
            <div style={{ fontSize: 23 }}>{titulo}</div>
            <div style={{ fontSize: 27, fontWeight: "bold" }}>{valor}</div>
        </div>
    );
}

export default function KPICards() {
    const hoy = new Date().toISOString().split("T")[0];
    const { citas } = useAgendaDia(hoy);
    const total = citas.length;
    const confirmadas = citas.filter(c => c.estado === "Confirmada").length;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 15 }}>
            <Card titulo="Citas hoy" valor={total} />
            <Card titulo="Citas confirmadas" valor={confirmadas} />
            <Card titulo="Citas Pendientes" valor={total - confirmadas} />
            <Card titulo="Ingresos aproximados" valor={`$${total * 300}`} />
        </div>
    );
}
