interface Props {
    cara: string;
    estado?: string;
    onClick: () => void;
}

const colores: Record<string, string> = {
    sano: "#A7F3D0",
    caries: "#FCA5A5",
    restauracion: "#93C5FD",
    extraccion: "#6B7280",
};

export default function CaraDiente({ cara, estado, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                width: 20, height: 20, border: "1px solid #999",
                background: estado ? colores[estado] || "#fff" : "#fff",
                cursor: "pointer"
            }}
            title={`${cara} - ${estado || "Sin estado"}`}
        />
    );
}
