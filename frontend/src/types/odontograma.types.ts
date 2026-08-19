export type CaraDiente =
    | "oclusal"
    | "mesial"
    | "distal"
    | "vestibular"
    | "lingual";

export type EstadoDiente =
    | "sano"
    | "caries"
    | "restauracion"
    | "extraccion";

export interface Odontograma {
    id: string;
    paciente_id: string;
    diente_numero: string;
    cara?: CaraDiente;
    estado?: EstadoDiente;
    tratamiento_id?: string;
    tratamiento_nombre?: string;
    notas?: string;
    created_at: string;
}

export interface UpsertOdontogramaDto {
    paciente_id: string;
    diente_numero: string;
    cara?: CaraDiente;
    estado?: EstadoDiente;
    tratamiento_id?: string;
    notas?: string;
}
