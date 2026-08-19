import { useEffect, useState } from "react";
import { useHistorial } from "../hooks/useHistorial";
import { useEspecialistas } from "../../especialistas/hooks/useEspecialistas";
import { useCitasPaciente } from "../../citas/hooks/useCitasPaciente";

export default function HistorialForm({ paciente_id, data, onClose }: any) {
    const { create, update } = useHistorial();
    const { especialistas } = useEspecialistas();
    const { citas } = useCitasPaciente(paciente_id);
    const [form, setForm] = useState({ especialista_id: "", cita_id: "", motivo_consulta: "", diagnostico: "", tratamiento: "", observaciones: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer"};
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer"};

    useEffect(() => {if (data) {setForm(data);}}, [data]);

    function handleChange(e: React.ChangeEvent<any>) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    function handleSelectCita(e: React.ChangeEvent<HTMLSelectElement>) {
        const cita_id = e.currentTarget.value;
        const cita = citas.find(c => c.id === cita_id);

        setForm({...form, cita_id, motivo_consulta: cita?.motivo_consulta || "", observaciones: cita?.notas || ""});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (data) {
            await update(data.id, form);
        } else {await create({ ...form, paciente_id });}
        onClose();
    }

    return (
        <div style={{background: "#fff", padding: 20, borderRadius: 8 }}>
            <h3>Registro clínico</h3>
            <form onSubmit={handleSubmit}>
                {/* Especialista*/}
                <select name="especialista_id" value={form.especialista_id} onChange={handleChange} required>
                    <option value="">Especialista</option>
                    {especialistas.map((e: any) => (<option key={e.id} value={e.id}>{e.nombre} - { e.especialidad}</option>))}
                </select>
                {/* Cita */}
                <select name="cita_id" value={form.cita_id} onChange={handleSelectCita}>
                    <option value="">Cita</option>
                    {citas.map((c: any) => (<option key={c.id} value={c.id}>{new Date(c.fecha_hora).toLocaleString()}</option>))}
                </select>
                <textarea name="motivo_consulta" placeholder="Motivo de la consulta" value={form.motivo_consulta} onChange={handleChange} />
                <textarea name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico} onChange={handleChange} required />
                <textarea name="tratamiento" placeholder="Tratamiento" value={form.tratamiento} onChange={handleChange} />
                <textarea name="observaciones" placeholder="Observaciones" value={form.observaciones} onChange={handleChange} />
                <div style={{ marginTop: 10}}>
                    <button style={buttonSave} type="submit">Guardar</button><button style={buttonCancel} type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
