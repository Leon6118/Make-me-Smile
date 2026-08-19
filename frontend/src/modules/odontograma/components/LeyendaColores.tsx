export default function LeyendaColores() {
    const items = [
        { label: "Sano", color: "#A7F3D0" },
        { label: "Caries", color: "#FCA5A5" },
        { label: "Restauración", color: "#93C5FD" },
        { label: "Extracción", color: "#6B7280" },
    ];

    return (
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {items.map(i => (
                <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 15, height: 15, background: i.color }} />
                    <span>{i.label}</span>
                </div>
            ))}
        </div>
    );
}
