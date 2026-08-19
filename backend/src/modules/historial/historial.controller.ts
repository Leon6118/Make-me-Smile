import { Request, Response, NextFunction } from "express";
import { createHistorialService,getHistorialPacienteService,getHistorialByIdService,updateHistorialService } from "./historial.service";

interface ParamsId {id: string;}

export async function createHistorialController(req: Request, res: Response, next: NextFunction) {
    try {
        const historial = await createHistorialService(req.body);
        res.json({success: true, data: historial});
    } catch (error) {next(error);}
}

export async function getHistorialPacienteController(req: Request, res: Response, next: NextFunction) {
    try {
        const { paciente_id } = req.query;
        const historial = await getHistorialPacienteService(paciente_id as string);
        res.json({success: true, data: historial});
    } catch (error) {next(error);}
}

export async function getHistorialByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const historial = await getHistorialByIdService(req.params.id);
        res.json({success: true, data: historial});
    } catch (error) {next(error);}
}

export async function updateHistorialController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const historial = await updateHistorialService(req.params.id, req.body);
        res.json({success: true, data: historial});
    } catch (error) {next(error);}
}
