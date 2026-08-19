import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePacientes } from "../../pacientes/hooks/usePacientes";
import HistorialTimeline from "../components/HistorialTimeline";
import HistorialForm from "../components/HistorialForm";
import { calcularEdad } from "../../../utils/date.utils";

export default function HistorialPage() {
    const { id } = useParams(); // paciente_id
    const paciente_id = id as string;
    const { pacientes } = usePacientes();
    const paciente = pacientes.find(p => p.id === paciente_id);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    
    function handleNew() {
        setEditing(null);
        setShowForm(true);
    }

    function handleEdit(data: any) {
        setEditing(data);
        setShowForm(true);
    }

    function closeModal() {
        setShowForm(false);
        setEditing(null);
        setRefreshKey(prev => prev + 1);
    }

    if (!paciente) return <p>Cargando paciente...</p>;

    return (
        <div style={{ padding: 30 }}>
            {/* 🧾 HEADER PACIENTE */ }
            <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
                <h1> 👤 {paciente.nombre}</h1>
                <div style={{ display: "flex", gap: 20 }}>
                    <div><b>📨 Email:</b> {paciente.email}</div>
                    <div><b>☎️ Teléfono:</b> {paciente.telefono}</div>
                    <div><b>📅 Fecha de nacimiento:</b> {new Date(paciente.fecha_nacimiento).toLocaleDateString()}</div>
                    <div><b>🎂 Edad:</b> {calcularEdad(paciente.fecha_nacimiento)} años</div>
                </div>
                <div style={{ marginTop: 10 }}><b>📝 Notas:</b> {paciente.notas}</div>
            </div>

            {/* ACCIONES */}
            <div style={{ marginBottom: 20 }}>
                <button style={buttonAdd}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={handleNew}>➕ Nuevo regitro clínico </button></div>

            {/* TIMELINE */}
            <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
                <HistorialTimeline key={refreshKey} paciente_id={paciente_id} onEdit={handleEdit} />
            </div>

            {/* MODAL */}
            {showForm && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{ width: "500px", background: "#fff", padding: 20, borderRadius: 10}}>
                        <HistorialForm paciente_id={paciente_id} data={editing} onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
