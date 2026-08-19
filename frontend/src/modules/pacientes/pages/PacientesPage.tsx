import { useState } from "react";
import { usePacientes } from "../hooks/usePacientes";
import PacienteForm from "../components/PacienteForm";
import { useNavigate } from "react-router-dom";
import { calcularEdad } from "../../../utils/date.utils";

export default function PacientesPage() {
    const { pacientes, buscar, reload } = usePacientes();
    const [search, setSearch] =useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const navigate = useNavigate();
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonEdit = {padding: "6px 10px", background: "#FDE68A", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonExp = {padding: "6px 10px", background: "#93C5FD", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const thStyle = {border: "1px solid #ccc", padding: "15px", backgroundColor: "#c6c2e3"};
    const tdStyle = {border: "1px solid #ccc", padding: "10px"};
    
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setSearch(value);
        buscar(value);
    }

    function handleEdit(p: any) {
        setEditing(p);
        setShowForm(true);
    }

    function closeModal() {
        setShowForm(false);
        setEditing(null);
        reload();
    }

    return (
        <div style={{ padding: 30}}>
            <h2>👤 Pacientes</h2>
            {/* 🔎 BUSCADOR */}
            <div style={{ marginBottom: 20 }}>
                <input placeholder="🔎 Buscar paciente..." value={search} onChange={handleSearch} />
                <button style={buttonAdd}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={() => setShowForm(true)}>➕ Nuevo paciente</button>
            </div>

            {/* 📊 TABLA */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                    <th style={thStyle}>🪪 Nombre</th>
                    <th style={thStyle}>☎️ Teléfono</th>
                    <th style={thStyle}>📨 Email</th>
                    <th style={thStyle}>📅 Fecha de nacimiento</th>
                    <th style={thStyle}>🎂 Edad</th>
                    <th style={thStyle}>📝 Notas</th>
                    <th style={thStyle}>🚀 Acciones</th>
                </tr></thead>
                <tbody>
                    {pacientes.map((p) => (
                        <tr key={p.id}>
                            <td style={tdStyle}>{p.nombre}</td>
                            <td style={tdStyle}>{p.telefono}</td>
                            <td style={tdStyle}>{p.email}</td>
                            <td style={tdStyle}>{new Date(p.fecha_nacimiento).toLocaleDateString()}</td>
                            <td style={tdStyle}>{calcularEdad(p.fecha_nacimiento)} años</td>
                            <td style={tdStyle}>{p.notas || "-"}</td>
                            <td style={tdStyle}><div style={{ display: "flex", gap: 8 }}>
                                <button style={buttonEdit}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleEdit(p)}>✏️ Editar</button>
                                <button style={buttonExp}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => navigate(`/historial/${p.id}`)}>📋 Expediente</button>
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🧾 MODAL */}
            {showForm && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{ width: "500px", background: "#fff", padding: 20, borderRadius: 10}}>
                        <PacienteForm data={editing} onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
