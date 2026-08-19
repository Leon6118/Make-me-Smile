import { useNavigate } from "react-router-dom";
import { theme } from "../../config/theme";
import logo from "../../assets/logo.jpeg";

export default function Sidebar() {
    const navigate = useNavigate();
    const itemStyle = {padding: "15px 20px", cursor: "pointer", color: theme.textDark, borderRadius: 9, margin: "6px 9px", fontSize: 23 };
    const itemHover = {background: "#ffffff88"};

    return (
        <div style={{width: 240, height: "100vh", background: theme.sidebar, display: "flex", flexDirection: "column", boxShadow: "2px 0 5px rgba(0,0,0,0.05)"}}>
            {/* LOGO */}
            <div style={{padding: 20, textAlign: "center"}}>
                <img src={logo} alt="Make me Smile" style={{width: "100%", borderRadius: 12}} />
            </div>

            {/* MENÚ */}
            <div style={itemStyle} onClick={() => navigate("/dashboard")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                🏠 Inicio
            </div>
            <div style={itemStyle} onClick={() => navigate("/pacientes")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                👤 Pacientes
            </div>
            <div style={itemStyle} onClick={() => navigate("/citas")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                📅 Agenda
            </div>
            <div style={itemStyle} onClick={() => navigate("/especialistas")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                🩺 Especialistas
            </div>
            <div style={itemStyle} onClick={() => navigate("/consultorios")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                🏥 Consultorios
            </div>
            <div style={itemStyle} onClick={() => navigate("/usuarios")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                👥 Usuarios
            </div>
            <div style={itemStyle} onClick={() => navigate("/roles")} onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHover)} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                🔐 Roles
            </div>
        </div>
    );
}
