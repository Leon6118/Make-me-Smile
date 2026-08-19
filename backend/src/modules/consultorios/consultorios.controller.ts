import { Request, Response, NextFunction } from "express";
import { createConsultorioService, getConsultoriosService, getConsultorioByIdService, updateConsultorioService, deleteConsultorioService } from "./consultorios.service";

interface ParamsId {id: string;}

export async function createConsultorioController(req: Request, res: Response, next: NextFunction) {
    try {
        const consultorio = await createConsultorioService(req.body);
        res.json({succes: true, data: consultorio});
    } catch (error) {next(error);}
}

export async function getConsultoriosController(req: Request, res: Response, next: NextFunction) {
    try {
        const consultorios = await getConsultoriosService();
        res.json({succes: true, data: consultorios});
    } catch (error) {next(error);}
}

export async function getConsultorioByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const consultorio = await getConsultorioByIdService(req.params.id);
        res.json({succes: true, data: consultorio});
    } catch (error) {next(error);}
}

export async function updateConsultorioController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const consultorio = await updateConsultorioService(req.params.id, req.body);
        res.json({succes: true, data: consultorio});
    } catch (error) {next(error);}
}

export async function deleteConsultorioController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const result = await deleteConsultorioService(req.params.id);
        res.json({succes: true, data: result});
    } catch (error) {next(error);}
}
