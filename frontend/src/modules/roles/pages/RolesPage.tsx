import { useState } from "react";
import { useRoles } from "../hooks/useRoles";
import RolForm from "../components/RolForm";

export default function RolesPage() {
    const { roles, reload, remove } = useRoles();
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const thStyle = {border: "1px solid #ccc", padding: "10px", backgroundColor: "#c6c2e3"};
    const tdStyle = {border: "1px solid #ccc", padding: "10px"};
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonPrimary = {padding: "8px 14px", background: "#bcf7ff", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonDanger = {padding: "8px 14px", background: "#F7C8E0", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    function handleNew() {
        setSelected(null);
        setShowForm(true);
    }

    function handleEdit(r: any) {
        setSelected(r);
        setShowForm(true);
    }

    async function handleDelete(id: string) {
        if (!confirm("¿Eliminar rol?")) return;
        await remove(id);
    }

    return (
        <div style={{ padding: 30}}>
            <h2>🔐 Roles</h2>
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={handleNew}>Nuevo rol</button>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20}}>
                <thead>
                    <tr><th style={thStyle}>Nombre</th><th style={thStyle}>Descripción</th><th style={thStyle}>Acciones</th></tr>
                </thead>
                <tbody>
                    {roles.map((r) => (
                        <tr key={r.id}>
                            <td style={tdStyle}>{r.nombre}</td>
                            <td style={tdStyle}>{r.descripcion}</td>
                            <td style={tdStyle}>
                                <button style={buttonPrimary}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleEdit(r)}>✏️ Editar</button>
                                <button style={buttonDanger}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handleDelete(r.id)}>❌ Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (<RolForm rol={selected} onClose={() => {setShowForm(false); reload();}} />)}
        </div>
    );
}
