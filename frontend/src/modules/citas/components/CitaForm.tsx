import { useEffect, useState } from "react";
import { useCitas } from "../hooks/useCitas";
import { usePacientesSimple } from "../hooks/usePacientesSimple";
import { useEspecialistasSimple } from "../hooks/useEspecialistasSimple";
import { useConsultoriosSimple } from "../hooks/useConsultoriosSimpe";
import { useClinicas } from "../../clinicas/hooks/useClinicas";

export default function CitaForm({ cita, fechaHora, onClose, pacientePreseleccionado, onSaved }: any) {
    const { create, update, remove } = useCitas();
    const { pacientes } = usePacientesSimple();
    const { especialistas } = useEspecialistasSimple();
    const { consultorios } = useConsultoriosSimple();
    const { clinicas } = useClinicas();
    const [form, setForm] = useState<any>({clinica_id: "", consultorio_id: "", especialista_id: "", paciente_id: "", fecha_hora: "", duracion_minutos: 30, estado: "programada", motivo_consulta: "", notas: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    const buttonDanger = {padding: "8px 14px", background: "#f87171", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    function formatFechaInput(fecha: string) {
        const d = new Date(fecha);
        return d.getFullYear() + "-" +
            String(d.getMonth() + 1).padStart(2, "0") + "-" +
            String(d.getDate()).padStart(2, "0") + "T" +
            String(d.getHours()).padStart(2, "0") + ":" +
            String(d.getMinutes()).padStart(2, "0");
    }

    useEffect(() => {
        if (cita) {setForm({...cita, fecha_hora: formatFechaInput(cita.fecha_hora)});}
        else if (fechaHora) {
            setForm((prev: any) => ({...prev, fecha_hora: fechaHora, paciente_id: pacientePreseleccionado || ""}));
        }
    }, [cita, fechaHora, pacientePreseleccionado]);

    function handleChange(e: any) {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value});
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (cita) {
            await update(cita.id, form);
        } else {await create(form);}
        if (onSaved) onSaved();
        onClose();
    }

    async function handleDelete() {
        if (cita) {
            await remove(cita.id);
            if (onSaved) onSaved();
            onClose();
        }
    }

    return (
        <div style={{ marginTop: 20, padding: 20, background: "#fff", borderRadius: 10, border: "1px solid #ddd"}}>
            <h3>{cita ? "Editar cita" : "Nueva Cita"}</h3>
            <form onSubmit={handleSubmit}>
                <input name="fecha_hora" value={form.fecha_hora} onChange={handleChange} />
                {/* Clínica */}
                <select name="clinica_id" value={form.clinica_id} onChange={handleChange}>
                    <option value="">Clínica</option>
                    {clinicas.map((c) => (<option key={c.id} value={c.id}>{c.nombre}</option>))}
                </select>
                {/* Consultorio */}
                <select name="consultorio_id" value={form.consultorio_id} onChange={handleChange}>
                    <option value="">Consultorio</option>
                    {consultorios.map((c) => (<option key={c.id} value={c.id}>{c.nombre}</option>))}
                </select>
                {/* Especialista */}
                <select name="especialista_id" value={form.especialista_id} onChange={handleChange}>
                    <option value="">Especialista</option>
                    {especialistas.map((e) => (<option key={e.id} value={e.id}>{e.nombre}</option>))}
                </select>
                {/* Paciente */}
                <select name="paciente_id" value={form.paciente_id} onChange={handleChange}>
                    <option value="">Paciente</option>
                    {pacientes.map((p) => (<option key={p.id} value={p.id}>{p.nombre}</option>))}
                </select>
                {/* Duración */}
                <select name="duracion_minutos" value={form.duracion_minutos} onChange={handleChange}>
                    <option value={30}>30 min</option>
                    <option value={60}>60 min</option>
                    <option value={90}>90 min</option>
                    <option value={120}>120 min</option>
                </select>
                <select name="estado" value={form.estado} onChange={handleChange}>
                    <option value="Programada">🟣 Programada</option>
                    <option value="Confirmada">🔵 Confirmada</option>
                </select>
                <input name="motivo_consulta" placeholder="Motivo Consulta" value={form.motivo_consulta} onChange={handleChange} />
                <input name="notas" placeholder="Notas adicionales" value={form.notas} onChange={handleChange} />
                <div style={{ marginTop: 10 }}>
                    <button style={buttonSave}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="submit">Guardar</button>
                    <button style={buttonCancel}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        type="button" onClick={onClose}>Cancelar</button>
                    {cita && (
                        <button style={buttonDanger}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            type="button" onClick={handleDelete}>Eliminar</button>
                    )}
                </div>
            </form>
        </div>
    );
}
