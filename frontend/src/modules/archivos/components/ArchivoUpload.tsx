import { useState } from "react";
import { api } from "../../../api/api";

export default function ArchivoUpload({ historial_id, onUploaded }: any) {
    const [file, setFile] = useState<File | null>(null);
    const [descripcion, setDescripcion] = useState("");
    const buttonAdd = {padding: "8px 14px", background: "#A7D8D8", border: "none", borderRadius: 6, cursor: "pointer", transform: "scale(1)" };
        
    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) {alert("Selecciona un archivo"); return;}
        const formData = new FormData();
        formData.append("file", file);
        formData.append("historial_id", historial_id);
        formData.append("descripcion", descripcion);

        try {
            await api.post("/archivos", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFile(null);
            setDescripcion("");
            onUploaded && onUploaded();
        } catch (error) {alert("Error al subir archivo");}
    }

    return (
        <form onSubmit={handleUpload} style={{ marginTop: 10 }}>
            <input type="file" onChange={(e) => setFile(e.currentTarget.files?.[0] || null)} />
            <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.currentTarget.value)} />
            <button style={buttonAdd}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                type="submit">Cargar archivo</button>
        </form>
    );
}
