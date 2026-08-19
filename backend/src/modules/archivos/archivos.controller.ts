import { Request, Response, NextFunction } from "express";
import { createArchivoService, getArchivosByHistorialService, getArchivoByIdService, updateArchivoService, deleteArchivoService } from "./archivos.service";

interface ParamsId {id: string;}

export async function createArchivoController(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file;
        if (!file) {
            throw { status: 400, message: "Archivo requerido" };
        }
        const payload = {
            historial_id: req.body.historial_id,
            nombre_archivo: file.originalname,
            tipo_archivo: file.mimetype,
            ruta_archivo: `/uploads/${file.filename}`,
            descripcion: req.body.descripcion
        };
        const archivo = await createArchivoService(payload);
        res.json({success: true, data: archivo});
    } catch (error) {next(error);}
}

export async function getArchivosByHistorialController(req: Request, res: Response, next: NextFunction) {
    try {
        const { historial_id } = req.query;
        const archivos = await getArchivosByHistorialService(historial_id as string);
        res.json({success: true, data: archivos});
    } catch (error) {next(error);}
}

export async function getArchivoByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const archivo = await getArchivoByIdService(req.params.id);
        res.json({success: true, data: archivo});
    } catch (error) {next(error);}
}

export async function updateArchivoController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const archivo = await updateArchivoService(req.params.id, req.body);
        res.json({success: true, data: archivo});
    } catch (error) {next(error);}
}

export async function deleteArchivoController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const result = await deleteArchivoService(req.params.id);
        res.json({success: true, data: result});
    } catch (error) {next(error);}
}
