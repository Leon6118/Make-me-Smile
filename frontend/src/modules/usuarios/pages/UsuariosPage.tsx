import { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioForm from "../components/UsuarioForm";
import PasswordForm from "../components/PasswordForm";

export default function UsuariosPage() {
    const { usuarios, reload } = useUsuarios();
    const [showForm, setShowForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const thStyle = {border: "1px solid #ccc", padding: "10px", backgroundColor: "#c6c2e3"};
    const tdStyle = {border: "1px solid #ccc", padding: "10px"};
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonPrimary = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    
    function handlePassword(email: string) {
        setSelectedEmail(email);
        setShowPassword(true);
    }

    return (
        <div style={{ padding: 30}}>
            <h2>👥 Usuarios</h2>
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={() => setShowForm(true)}>Nuevo usuario</button>
            <table style={{ width:"100%", borderCollapse:"collapse", marginTop: 20}}>
                <thead>
                    <tr>
                        <th style={thStyle}>🪪 Nombre</th>
                        <th style={thStyle}>📨 Email</th>
                        <th style={thStyle}>☎️ Teléfono</th>
                        <th style={thStyle}>🚀 Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td style={tdStyle}>{u.nombre}</td>
                            <td style={tdStyle}>{u.email}</td>
                            <td style={tdStyle}>{u.telefono}</td>
                            <td style={tdStyle}>
                                <button style={buttonPrimary}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => handlePassword(u.email)}>Cambiar contraseña</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (<UsuarioForm onClose={() => {setShowForm(false); reload();}} />)}
            {showPassword && (<PasswordForm email={selectedEmail} onClose={() => setShowPassword(false)} />)}
        </div>
    );
}
