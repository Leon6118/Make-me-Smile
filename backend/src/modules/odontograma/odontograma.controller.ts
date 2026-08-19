import { Request, Response, NextFunction } from "express";
import { upsertOdontogramaService, getOdontogramaPacienteService, deleteOdontogramaService } from "./odontograma.service";

interface ParamsId { id: string; }

export async function upsertOdontogramaController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await upsertOdontogramaService(req.body);
        res.json({ success: true, data });
    } catch (e) {next(e); }
}

export async function getOdontogramaPacienteController(req: Request, res: Response, next: NextFunction) {
    try {
        const { paciente_id } = req.query;
        const data = await getOdontogramaPacienteService(paciente_id as string);
        res.json({ success: true, data });
    } catch (e) {next(e); }
}

export async function deleteOdontogramaController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const data = await deleteOdontogramaService(req.params.id);
        res.json({ success: true, data });
    } catch (e) {next(e); }
}
