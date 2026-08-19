import { useState, useEffect } from "react";
import { createPaciente, updatePaciente } from "../services/pacientes.service";
import { useClinicas } from "../../clinicas/hooks/useClinicas";
import { useNavigate } from "react-router-dom";

export default function PacienteForm({ onClose, data }: any) {
    const { clinicas } = useClinicas();
    const navigate = useNavigate();
    const [form, setForm] = useState({clinica_id: "", nombre: "", fecha_nacimiento: "", telefono: "", email: "", notas: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    useEffect(() => {if (data) {
        setForm({clinica_id: data.clinica_id, nombre: data.nombre, fecha_nacimiento: data.fecha_nacimiento?.split("T")[0], telefono: data.telefono || "", email: data.email || "", notas: data.notas || ""});
    }}, [data]);

    function handleChange(e: any) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        let paciente;
        if (data) {
            paciente = await updatePaciente(data.id, form);
        } else {
            paciente = await createPaciente(form);
            const confirmar = window.confirm("¿Deseas agendar la primera cita ahora");
            if (confirmar) {onClose(); navigate(`/citas?paciente_id=${paciente.id}`); return;}
        }
        onClose();
    }

    return (
        <div>
            <h3>{data ? "Editar paciente" : "Nuevo Paciente"}</h3>
            <form onSubmit={handleSubmit}>
                <select name="clinica_id" value={form.clinica_id} onChange={handleChange} required>
                    <option value="">Seleccionar clínica</option>
                    {clinicas.map((c) => (<option key={c.id} value={c.id}>{c.nombre}</option>))}
                </select>
                <input name="nombre" value={form.nombre} placeholder="Nombre" onChange={handleChange} required />
                <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} required />
                <input name="telefono" value={form.telefono} placeholder="Teléfono" onChange={handleChange} />
                <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
                <input name="notas" value={form.notas} placeholder="Notas" onChange={handleChange} />
                <div style={{ marginTop: 10 }}>
                    <button style={buttonSave}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="submit">{data ? "Actualizar" : "Guardar"}</button>
                    <button style={buttonCancel}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
