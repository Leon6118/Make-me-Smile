import { Request, Response, NextFunction } from "express";
import { createEspecialistaService, getEspecialistasService, getEspecialistaByIdService, updateEspecialistaService } from "./especialistas.service";

interface ParamsId {id: string;}

export async function createEspecialistaController(req: Request, res: Response, next: NextFunction) {
    try {
        const especialista = await createEspecialistaService(req.body);
        res.json({success: true, data: especialista});
    } catch (error) {next(error);}
}

export async function getEspecialistasController(req: Request, res: Response, next: NextFunction) {
    try {
        const especialistas = await getEspecialistasService();
        res.json({success: true, data: especialistas});
    } catch (error) {next(error);}
}

export async function getEspecialistaByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const especialista = await getEspecialistaByIdService(req.params.id);
        res.json({success: true, data: especialista});
    } catch (error) {next(error);}
}

export async function updateEspecialistaController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const especialista = await updateEspecialistaService(req.params.id, req.body);
        res.json({success: true, data: especialista});
    } catch (error) {next(error);}
}
