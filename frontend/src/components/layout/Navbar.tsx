import { useAuth } from "../../modules/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { theme } from "../../config/theme";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const buttonStyle = {padding: "6px 12px", background: "#fff", color: theme.textDark, border: "none", borderRadius: 6, cursor: "pointer"};

    function handleLogout() {logout(); navigate("/");}

    return (
        <div style={{height: 60, background: theme.navbar, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "o 20px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", borderBottom: "1px solid #ddd"}}>
            <span style={{fontWeight: "bold", color: theme.textDark}}>Sistema Clínico</span>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 15, fontWeight: 500}}>{user?.nombre}</span>
                <button style={buttonStyle} onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
}
