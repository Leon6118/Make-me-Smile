import { usePagos } from "../hooks/usePagos";
import PagoForm from "./PagoForm";

export default function PagosPanel({ tratamiento, paciente_id }: any) {
    const { pagos, crear, eliminar } = usePagos(tratamiento.id);
    const totalPagado = pagos.reduce((acc, p) => acc + Number(p.monto), 0);
    const saldo = Number(tratamiento.costo) - totalPagado;
    const buttonDanger = {padding: "8px 14px", background: "#F7C8E0", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };

    return (
        <div style={{ marginTop: 10, padding: 12, background: "#fef3c7", borderRadius: 8 }}>
            <h4>💰 Pagos</h4>
            {/* RESUMEN */}
            <div style={{ marginBottom: 10 }}>
                <p><b>Costo:</b> ${tratamiento.costo}</p>
                <p><b>Pagado:</b> ${totalPagado}</p>
                <p style={{ color: saldo > 0 ? "red" : "green" }}><b>Saldo pendiente:</b> ${saldo}</p>
            </div>

            {/* LISTA */}
            {pagos.map((p) => (
                <div key={p.id} style={{ background: "#fff", padding: 8, marginBottom: 6, borderRadius: 6 }}>
                    <p><b>{p.monto}</b> - {p.metodo_pago}</p>
                    <small>{new Date(p.fecha_pago).toLocaleString()}</small>
                    <button style={buttonDanger}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        onClick={() => eliminar(p.id)}>Eliminar</button>
                </div>
            ))}

            {/* FORM */}
            <PagoForm tratamiento_id={tratamiento.id} paciente_id={paciente_id} onSave={crear} />
        </div>
    );
}
