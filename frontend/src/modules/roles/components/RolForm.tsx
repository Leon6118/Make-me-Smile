import { useEffect, useState } from "react";
import { createRol, updateRol } from "../services/roles.service";

export default function RolForm({ rol, onClose }: any) {
    const [form, setForm] = useState({nombre: "", descripcion: ""});
    useEffect(() => {if (rol) {setForm({nombre: rol.nombre, descripcion: rol.descripcion || ""});}}, [rol]);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (rol) {
            await updateRol(rol.id, form);
        } else {await createRol(form);}
        onClose();
    }

    return (
        <div style={{marginTop: 20, padding: 20, border: "1px solid #ddd", borderRadius: 10, background: "#fff"}}>
            <h3>{rol ? "Editar Rol" : "Nuevo Rol"}</h3>
            <form onSubmit={handleSubmit}>
                <input name="nombre" placeholder="Nombre del rol" value={form.nombre} onChange={handleChange} required />
                <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                <div style={{ marginTop: 10}}>
                    <button style={buttonSave}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="submit">Guardar</button>
                    <button style={buttonCancel}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
