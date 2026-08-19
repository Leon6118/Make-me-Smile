import { useState } from "react";
import { useConsultorios } from "../hooks/useConsultorios";
import ConsultorioForm from "../components/ConsultorioForm";

export default function ConsultoriosPage() {
    const { consultorios, reload, remove } = useConsultorios();
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const thStyle = {border: "1px solid #ccc", padding: "10px", backgroundColor: "#c6c2e3"};
    const tdStyle = {border: "1px solid #ccc", padding: "10px"};
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonPrimary = {padding: "8px 14px", background: "#bcf7ff", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonDanger = {padding: "8px 14px", background: "#F7C8E0", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    function handleEdit(c: any) {
        setSelected(c);
        setShowForm(true);
    }

    function handleNew() {
        setSelected(null);
        setShowForm(true);
    }

    async function handleDelete(id: string) {
        if (!confirm("¿Eliminar consultorio?")) return;
        await remove(id);
    }

    return (
        <div style={{ padding: 30 }}>
            <h2>🏥 Consultorios</h2>
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={handleNew}>Nuevo Consultorio</button>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
                <thead>
                    <tr><th style={thStyle}>Nombre</th><th style={thStyle}>Descripción</th><th style={thStyle}>Acciones</th></tr>
                </thead>
                <tbody>
                    {consultorios.map((c) => (
                        <tr key={c.id}>
                            <td style={tdStyle}>{c.nombre}</td>
                            <td style={tdStyle}>{c.descripcion}</td>
                            <td style={tdStyle}>
                                <button style={buttonPrimary}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleEdit(c)}>✏️ Editar</button>
                                <button style={buttonDanger}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleDelete(c.id)}>❌ Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (<ConsultorioForm consultorio={selected} onClose={() => {setShowForm(false); reload();}} /> )}
        </div>
    );
}
