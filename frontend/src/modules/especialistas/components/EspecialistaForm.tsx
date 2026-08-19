import React, { useEffect, useState } from "react";
import { useCreateEspecialista } from "../hooks/useCreateEspecialista";
import { useUpdateEspecialista } from "../hooks/useUpdateEspecialista";
import { useUsuariosDisponibles } from "../hooks/useUsuariosDisponibles";

export default function EspecialistaForm({ especialista, onClose }: any) {
    const { create } = useCreateEspecialista();
    const { update } = useUpdateEspecialista();
    const { usuarios } = useUsuariosDisponibles();
    const [form, setForm] = useState({usuario_id: "", especialidad: "", cedula_profesional: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };


    useEffect(() => {
        if (especialista) {
            setForm({
                usuario_id: especialista.usuario_id || "",
                especialidad: especialista.especialidad || "",
                cedula_profesional: especialista.cedula_profesional || ""
            });
        }
    }, [especialista]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (especialista) {
            await update(especialista.id, {especialidad: form.especialidad, cedula_profesional: form.cedula_profesional});
        } else { await create(form);}
        onClose();
    }

    return (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd", borderRadius: 10, background: "#fff"}}>
            <h3>{especialista ? "Editar Especialista" : "Nuevo Especialista"}</h3>
            <form onSubmit={handleSubmit}>
                {/* Usuario */}
                {!especialista && (<select name="usuario_id" value={form.usuario_id} onChange={handleChange} required>
                    <option value="">Seleccionar usuario</option>
                    {usuarios.map((u) => (<option key={u.id} value={u.id}>{u.nombre} - {u.email}</option>))}
                </select>)}
                {/* Especialidad */}<input name="especialidad" placeholder="Especialidad" value={form.especialidad} onChange={handleChange} />
                {/* Cédula profesional */}<input name="cedula_profesional" placeholder="Cédula Profesional" value={form.cedula_profesional} onChange={handleChange} />
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
