import { useState } from "react";
import { useEspecialistas } from "../hooks/useEspecialistas";
import EspecialistaForm from "../components/EspecialistaForm";

export default function EspecialistasPage() {
    const { especialistas, reload } = useEspecialistas();
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const thStyle = {border: "1px solid #ccc", padding: "10px", backgroundColor: "#c6c2e3"};
    const tdStyle = {border: "1px solid #ccc", padding: "10px"};
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonPrimary = {padding: "8px 14px", background: "#bcf7ff", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    
    function handleNew() {setSelected(null); setShowForm(true);}
    function handleEdit(e: any) {setSelected(e); setShowForm(true);}

    return (
        <div style={{ padding: 30 }}>
            <h2>🩺 Especialistas</h2>
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={handleNew}>➕ Nuevo Especialista</button>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20}}>
                <thead>
                    <tr>
                        <th style={thStyle}>🪪 Nombre</th>
                        <th style={thStyle}>📨 Email</th>
                        <th style={thStyle}>🩺 Especialidad</th>
                        <th style={thStyle}>🎓 Cédula Profesional</th>
                        <th style={thStyle}>🚀 Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {especialistas.map((e) => (
                        <tr key={e.id}>
                            <td style={tdStyle}>{e.nombre}</td>
                            <td style={tdStyle}>{e.email}</td>
                            <td style={tdStyle}>{e.especialidad}</td>
                            <td style={tdStyle}>{e.cedula_profesional}</td>
                            <td style={tdStyle}>
                                <button style={buttonPrimary}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleEdit(e)}>✏️ Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <EspecialistaForm especialista={selected} onClose={() => {setShowForm(false); reload();}} />
            )}
        </div>
    );
}
