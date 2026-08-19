export function formatHora(fecha: string) {
    const date = new Date(fecha);
    
    return date.toLocaleTimeString([], {
        hour: "2-digit", minute: "2-digit"
    });
}

export function calcularEdad(fecha_nacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha_nacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}
