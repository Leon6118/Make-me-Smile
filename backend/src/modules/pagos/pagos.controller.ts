import { Request, Response, NextFunction } from "express";
import { createPagoService, getPagosByTratamientoService, getPagosByPacienteService, getPagoByIdService, deletePagoService } from "./pagos.service";

interface ParamsId { id: string; }

export async function createPagoController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await createPagoService(req.body);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function getPagosByTratamientoController(req: Request, res: Response, next: NextFunction) {
    try {
        const { tratamiento_id } = req.query;
        const data = await getPagosByTratamientoService(tratamiento_id as string);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function getPagosByPacienteController(req: Request, res: Response, next: NextFunction) {
    try {
        const { paciente_id } = req.query;
        const data = await getPagosByPacienteService(paciente_id as string);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function getPagoByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const data = await getPagoByIdService(req.params.id);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function deletePagoController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const data = await deletePagoService(req.params.id);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}
