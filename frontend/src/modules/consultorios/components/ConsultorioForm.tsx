import { useEffect, useState } from "react";
import { createConsultorio, updateConsultorio } from "../services/consultorios.service";
import { useClinicas } from "../../clinicas/hooks/useClinicas";

export default function ConsultorioForm({ consultorio, onClose }: any) {
    const { clinicas } = useClinicas();
    const [form, setForm] = useState({clinica_id: "", nombre: "", descripcion: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    useEffect(() => {if (consultorio) {
        setForm({clinica_id: consultorio.clinica_id, nombre: consultorio.nombre, descripcion: consultorio.descripcion || ""});
    }}, [consultorio]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (consultorio) {
            await updateConsultorio(consultorio.id, form);
        } else {await createConsultorio(form);}
        onClose();
    }

    return (
        <div style={{marginTop: 20, padding: 20, border: "1px solid #ddd", borderRadius: 10, background: "#fff"}}>
            <h3>{consultorio ? "Editar Consultorio" : "Nuevo Consultorio"}</h3>
            <form onSubmit={handleSubmit}>
                <select name="clinica" value={form.clinica_id} onChange={handleChange} required>
                    <option value="">Seleccionar clínica</option>
                    {clinicas.map((c) => (<option key={c.id} value={c.id}>{c.nombre}</option>))}
               </select>
               <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
               <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
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
