import { useState } from "react";
import { useArchivos } from "../hooks/useArchivos";
import ArchivoUpload from "./ArchivoUpload";

export default function ArchivosPanel({ historial_id }: any) {
    const { archivos, eliminar, reload } = useArchivos(historial_id);
    const [preview, setPreview] = useState<string | null>(null);
    const [previewType, setPreviewType] = useState<string>("");
    const buttonDanger = {padding: "8px 22px", background: "#F7C8E0", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)"};
    const buttonPrimary = {padding: "8px 14px", background: "#ffdc7a", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)"};

    function getFileType(nombre: string) {
        const ext = nombre.split(".").pop()?.toLowerCase();
        if (!ext) return "other";
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
        if (["pdf"].includes(ext)) return "pdf";
        return "other";
    }
    
    function openPreview(url: string, nombre: string) {
        const type = getFileType(nombre);
        setPreview(url);
        setPreviewType(type);
    }

    return (
        <div style={{marginTop: 15, padding: 12, background: "#c3bcf8", borderRadius: 8 }}>
            <h4>📁 Archivos clínicos</h4>
            {/* GRID tipo Google Drive */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginTop: 10 }}>
                {archivos.map((a) => {
                    const url = `http://localhost:3000${a.ruta_archivo}`;
                    const type = getFileType(a.nombre_archivo);
                    return (
                        <div key={a.id} style={{background:"#d6d1fa", borderRadius: 8, padding: 10, cursor:"pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.1)"}}>
                            {/* Preview thumbnail */}
                            <div onClick={() => openPreview(url, a.nombre_archivo)} style={{height: 100, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 8, background: "#f4f4f4", borderRadius: 6}}>
                                {type === "image" ? (
                                    <img src={url} style={{maxHeight: "100%", maxWidth: "100%"}} />
                                ) : type === "pdf" ? (
                                    <span>📄 PDF</span>
                                ) : (
                                    <span>📁 Archivo</span>
                                )}
                            </div>
                            <strong style={{ fontSize: 12}}>{a.nombre_archivo}</strong>
                            {a.descripcion && (<p style={{ fontSize: 12}}>{a.descripcion}</p>)}
                            <div style={{ marginTop: 6}}>
                                <button style={buttonPrimary}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => openPreview(url, a.nombre_archivo)}>👀 Vista previa</button>
                                <button style={buttonDanger}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => eliminar(a.id)}>❌ Eliminar</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* MODAL PREVIEW */}
            {preview && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center"}} onClick={() => setPreview(null)}>
                    <div style={{ background: "#fff", padding: 20, borderRadius: 10, maxWidth: "80%", maxHeight: "80%"}}>
                        {previewType === "image" && (<img src={preview} style={{ maxWidth: "100%", maxHeight: "70vh" }} />)}
                        {previewType === "pdf" && (<iframe src={preview} style={{ width: "600px", height: "500px" }} />)} 
                        {previewType === "other" && (<a href={preview} target="_blank">Descargar archivo</a>)}
                    </div>
                </div>
            )}

            {/* UPLOAD */}
            <h4 style={{ marginTop: 15 }}>⬆️ Nuevo archivo</h4>
            <ArchivoUpload historial_id={historial_id} onUploaded={reload} />

        </div>
    );
}
