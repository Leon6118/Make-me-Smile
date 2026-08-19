import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login: loginContext } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = await login(email, password);
            loginContext(data.data);
            navigate("/dashboard");
        } catch(error) {alert("Credenciales incorrectas");}
    }
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }
    
    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input placeholder="Email" value={email} onChange={handleEmailChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}
