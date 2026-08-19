import { useState } from "react";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

export default function PasswordForm({ email, onClose }: any) {
    const { changePassword } = useUpdatePassword();
    const [password, setPassword] = useState("");
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };


    async function  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await changePassword({ email, password });
        onClose();
    }

    return (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd", borderRadius: 10, background: "#fff"}}>
            <h3>Cambiar contraseña</h3>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
                <div style={{ marginTop: 10}}>
                    <button style={buttonSave}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="submit">Actualizar</button>
                    <button style={buttonCancel}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
