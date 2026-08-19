import { Request, Response, NextFunction } from "express";
import { createTratamientoService, getTratamientosByHistorialService, updateTratamientoService, deleteTratamientoService } from "./tratamientos.service";

interface ParamsId { id: string; }

export async function createTratamientoController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await createTratamientoService(req.body);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function getTratamientosByHistorialController(req: Request, res: Response, next: NextFunction) {
    try {
        const { historial_id } = req.query;
        const data = await getTratamientosByHistorialService(historial_id as string);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function updateTratamientoController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const data = await updateTratamientoService(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}

export async function deleteTratamientoController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const data = await deleteTratamientoService(req.params.id);
        res.json({ success: true, data });
    } catch (e) { next(e); }
}
