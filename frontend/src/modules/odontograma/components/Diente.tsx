import { useState } from "react";
import type { Odontograma } from "../../../types/odontograma.types";

interface Props {numero: string; datos: Odontograma[], onSelect: (cara: string | null) => void;}

function getColor(estado?: string) {
    switch (estado) {
        case "sano": return "#BBF7D0";
        case "caries": return "#FCA5A5";
        case "restauracion": return "#93C5FD";
        case "extraccion": return "#9CA3AF";
        default: return "#F3F4F6";
    }
}

export default function Diente({ numero, datos, onSelect }: Props) {
    const [hover, setHover] = useState(false);

    function getEstado(cara: string) {return datos.find((d) => d.cara === cara)?.estado;}
    function getEstadoGeneral() {return datos.find((d) => !d.cara)?.estado;}

    function getResumen() {
        if (!datos.length) return "Sin registros";
        return datos.map((d) => `${d.cara || "Diente"}: ${d.estado}`).join("\n");
    }
    const estadoGeneral = getEstadoGeneral();
    const bloqueado = estadoGeneral === "extraccion";

    return (
        <div style={{ position: "relative", textAlign: "center" }} 
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {/* Tooltip */}
            {hover && (
                <div style={{ position: "absolute", top: -70, left: "50%", transform: "translateX(-50%)", background: "#fff", padding: 8, borderRadius: 8, fontSize: 11, boxShadow: "0 2px 8px rgba(0,0,0,0.2)", whiteSpace: "pre-line", zIndex: 10 }}>
                    {getResumen()}
                </div>
            )}

            {/* DIENTE */}
            <div style={{ width: 42, height: 42, borderRadius: 10, background: estadoGeneral ? getColor(estadoGeneral) : "#fff", border: "2px solid #E5E7EB", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(3,1fr)", overflow: "hidden", cursor: "pointer", transition: "0.2s" }}>
                {/* TOP */}
                <div />
                <div onClick={() => !bloqueado && onSelect("V")} style={{ background: getColor(getEstado("V")) }} />
                <div />

                {/* MID */}
                <div onClick={() => !bloqueado && onSelect("M")} style={{ background: getColor(getEstado("M")) }} />
                <div onClick={() => !bloqueado && onSelect("O")} style={{ background: getColor(getEstado("O")) }} />
                <div onClick={() => !bloqueado && onSelect("D")} style={{ background: getColor(getEstado("D")) }} />

                {/* BOT */}
                <div />
                <div onClick={() => !bloqueado && onSelect("L")} style={{ background: getColor(getEstado("L")) }} />
                <div />
            </div>

            {/* Número */}
            <div
                onClick={() => onSelect(null)}
                style={{ marginTop: 4, fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>{numero}
            </div>
        </div>
    );
}
