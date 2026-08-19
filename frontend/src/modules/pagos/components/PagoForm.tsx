import { useState } from "react";
export default function PagoForm({tratamiento_id, paciente_id, onSave}: any) {
    const [form, setForm] = useState({monto: "", metodo_pago: "efectivo", referencia_pago: "", notas: ""});
    const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
    
    function handleChange(e: any) {setForm({...form, [e.target.name]: e.target.value});}

    function handleSubmit(e: any) {
        e.preventDefault();
        onSave({tratamiento_id, paciente_id, monto: Number(form.monto), metodo_pago: form.metodo_pago, referencia_pago: form.referencia_pago, notas: form.notas});
        setForm({monto: "", metodo_pago: "efectivo", referencia_pago: "", notas: ""});
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
            <input type="number" name="monto" placeholder="Monto" onChange={handleChange} required />
            <select name="metodo_pago" onChange={handleChange}>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
            </select>
            <input name="referencia_pago" placeholder="Referencia de pago" onChange={handleChange} />
            <input name="notas" placeholder="Notas adicionales" onChange={handleChange} />
            <button style={buttonSave}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                type="submit">💰 Registrar pago</button>
        </form>
    );
}
