import { useState } from "react";

export default function TratamientoForm({ historial_id, onSave }: any) {
    const [form, setForm] = useState({nombre: "", descripcion: "", costo: "", estado: "pendiente"});
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    function handleChange(e: any) {setForm({...form, [e.target.name]: e.target.value});}

    function handleSubmit(e: any) {
        e.preventDefault();
        onSave({historial_id, nombre: form.nombre, descripcion: form.descripcion, costo: Number(form.costo), estado: form.estado});
        setForm({nombre: "", descripcion: "", costo: "", estado: "pendiente"});
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
            <input name="nombre" placeholder="Nombre del tratamiento" onChange={handleChange} required />
            <input name="descripcion" placeholder="Descripción del tratamiento" onChange={handleChange} />
            <input name="costo" type="number" placeholder="Costo del tratamiento" onChange={handleChange} required />
            <select name="estado" onChange={handleChange}>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="completado">Completado</option>
            </select>
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                type="submit">💊 Guardar tratamiento</button>
        </form>
    );
}
