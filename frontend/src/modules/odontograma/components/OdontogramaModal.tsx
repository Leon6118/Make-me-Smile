import { useEffect, useState } from "react";
import { getTratamientosByHistorial } from "../../tratamientos/services/tratamientos.service";

const overlay = { position: "fixed" as const, top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent:"center", alignItems: "center", zIndex: 999 };
const modal = { background: "#ffffff", padding: 25, borderRadius: 16, width: 400, boxShadow: "0 8px rgba(0,0,0,0.15)" };
const input = { width: "100%", padding: 10, borderRadius: 8, marginBottom:10 };
const buttonSave = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer"};
const buttonCancel = {padding: "8px 14px", background: "#F7C8E0", border: "none", borderRadius: 6, cursor: "pointer"};

function getIconoTratamiento(nombre: string) {
    const n = nombre.toLowerCase();
    if (n.includes("limpieza")) return "🪥";
    if (n.includes("resina")) return "🦷";
    if (n.includes("extraccion")) return "🩸";
    if (n.includes("ortodoncia")) return "😁";
    return "💊";
}

export default function OdontogramaModal({ visible, onClose, onSave, historial_id, tipoSeleccion }: any) {
    const [estado, setEstado] = useState("");
    const [notas, setNotas] = useState("");
    const [tratamiento_id, setTratamientoId] = useState("");
    const [tratamientos, setTratamientos] = useState<any[]>([]);

    useEffect(() => {
        if (!historial_id) return;
        async function load() {
            const data = await getTratamientosByHistorial(historial_id);
            setTratamientos(data);
        } load();
    }, [historial_id]);

    if (!visible) return null;

    return (
        <div style={overlay}>
            <div style={modal}>
                <h3 style={{ color: "#7C3AED" }}>🦷 {tipoSeleccion === "diente" ? "Valoración del diente completo" : "Valoración por cara"}</h3>
                {/* ESTADO */}
                <label>Estado clínico</label>
                <select value={estado} onChange={(e) => setEstado(e.currentTarget.value)} style={input}>
                    <option value="">Seleccionar estado</option>
                    <option value="sano">🟢 Sano</option>
                    <option value="caries">🔴 Caries</option>
                    <option value="restauracion">🔵 Restauración</option>
                    <option value="extraccion">⚫ Extracción</option>
                </select>

                {/* TRATAMIENTO */}
                <label>Tratamiento</label>
                <select value={tratamiento_id} onChange={(e) => setTratamientoId(e.currentTarget.value)} style={input}>
                    <option value="">Sin tratamiento</option>
                    {tratamientos.map((t) => (
                        <option key={t.id} value={t.id}>
                            {getIconoTratamiento(t.nombre)} {t.nombre} (${t.costo})
                        </option>
                    ))}
                </select>

                {/* NOTAS */}
                <label>Notas</label>
                <textarea value={notas} onChange={(e) => setNotas(e.currentTarget.value)} style={input} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button style={buttonSave} onClick={() => onSave({ estado, notas, tratamiento_id })}>Guardar</button>
                    <button style={buttonCancel} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
