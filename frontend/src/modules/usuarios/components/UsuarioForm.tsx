import { useState } from "react";
import { useCreateUsuario } from "../hooks/useCreateUsuario";
import { useRoles } from "../../roles/hooks/useRoles";
import { useClinicas } from "../../clinicas/hooks/useClinicas";

export default function UsuarioForm({ onClose }: any) {
    const { create } = useCreateUsuario();
    const { roles } = useRoles();
    const { clinicas }= useClinicas();
    const [form, setForm] = useState({clinica_id: "", nombre: "", telefono: "", email: "", password: "", rol: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await create(form);
        onClose();
    }

    return (
        <div style={{marginTop: 20, padding: 20, border: "1px solid #ddd", borderRadius: 10, background: "#fff"}}>
            <h3>Nuevo Usuario</h3>
            <form onSubmit={handleSubmit}>
                {/* Clinica */}
                <select name="clinica_id" value={form.clinica_id} onChange={handleChange} required>
                    <option value="">Seleccinar clinica</option>
                    {clinicas.map((c) => (<option key={c.id} value={c.id}>{c.nombre}</option>))}
                </select>
                {/* Nombre */}
                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                {/* Telefono */}
                <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                {/* Email */}
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                {/* Password */}
                <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                {/* Rol */}
                <select name="rol" value={form.rol} onChange={handleChange} required>
                    <option value="">Seleccionar rol</option>
                    {roles.map((r) => (<option key={r.id} value={r.nombre}>{r.nombre}</option>))}
                </select>
                <div style={{ marginTop: 10 }}>
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
