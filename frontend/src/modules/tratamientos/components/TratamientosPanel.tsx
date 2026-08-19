import { useTratamientos } from "../hooks/useTratamientos";
import TratamientoForm from "./TratamientoForm";
import PagosPanel from "../../pagos/components/PagosPanel";

export default function TratamientosPanel({ historial_id, paciente_id }: any) {
    const { tratamientos, crear, eliminar } = useTratamientos(historial_id);
    const card = {padding: 10, borderRadius: 6, marginBottom: 8, background: "#c3bcf8"};
    const buttonDanger = {padding: "8px 14px", background: "#F7C8E0", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    return (
        <div style={{ marginTop: 15, padding: 12, background: "#ede9fe", borderRadius: 8 }}>
            <h4>💊 Tratamientos realizados</h4>
            {/* LISTA */}
            {tratamientos.map((t) => (
                <div key={t.id} style={card}>
                    <strong>{t.nombre}</strong>
                    <p><b>Costo:</b> ${t.costo}</p>
                    <p><b>Estado:</b> {t.estado}</p>
                    {t.descripcion && <p>{t.descripcion}</p>}
                    <button style={buttonDanger}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        onClick={() => eliminar(t.id)}>Eliminar</button>
                    {/* PAGOS */}
                    <PagosPanel tratamiento={t} paciente_id={paciente_id} />
                </div>
            ))}

            {/* FORM */}
            <h4>➕ Nuevo tratamiento</h4>
            <TratamientoForm historial_id={historial_id} onSave={crear} />
        </div>
    );
}
