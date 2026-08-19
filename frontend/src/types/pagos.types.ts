export interface Pago {
    id: string;
    tratamiento_id: string;
    paciente_id: string;
    monto: number;
    metodo_pago: string;
    referencia_pago: string;
    notas?: string;
    fecha_pago: string;
    tratamiento_nombre?: string;
}

export interface CreatePagoDto {
    tratamiento_id: string;
    paciente_id: string;
    monto: number;
    metodo_pago: string;
    referencia_pago: string;
    notas?: string;
}
