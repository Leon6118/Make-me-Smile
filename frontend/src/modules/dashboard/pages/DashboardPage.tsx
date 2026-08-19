import HoyPanel from "../components/HoyPanel";
import KPICards from "../components/KPICards";
import AlertasPanel from "../components/AlertasPanel";

export default function DashboardPage() {
    return (
        <div style={{ padding: 30 }}>
            <h1>🏥 Panel de control</h1>

            {/* KPI */}
            <KPICards />

            {/* Layout principal */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginTop: 20 }}>
                {/* Citas del día */}
                <HoyPanel />
                {/* Alertas */}
                <AlertasPanel />
            </div>
        </div>
    );
}
