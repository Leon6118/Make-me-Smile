import { Request, Response, NextFunction } from "express";
import { createCitaService, getAgendaDiaService, getCitaByIdService, updateCitaService, deleteCitaService, generarAgendaDiaService, getCitasByPacienteService } from "./citas.service";

interface ParamsId {id: string;}

export async function createCitaController(req: Request, res: Response, next: NextFunction) {
    try {
        const cita = await createCitaService(req.body);
        res.json({success: true, data: cita});
    } catch (error) {next(error);}
}

export async function getAgendaDiaController(req: Request, res: Response, next: NextFunction) {
    try {
        const { fecha } = req.query;
        const citas = await getAgendaDiaService(fecha as string);
        res.json({success: true, data: citas});
    } catch (error) {next(error);}
}

export async function getCitaByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const cita = await getCitaByIdService(req.params.id);
        res.json({success: true, data: cita});
    } catch (error) {next(error);}
}

export async function updateCitaController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const cita = await updateCitaService(req.params.id, req.body);
        res.json({success: true, data: cita});
    } catch (error) {next(error);}
}

export async function deleteCitaController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const result = await deleteCitaService(req.params.id);
        res.json({success: true, data: result});
    } catch (error) {next(error);}
}

export async function getCitasByPacienteController(req: Request, res: Response, next: NextFunction) {
    try {
        const { paciente_id } = req.query;
        const citas = await getCitasByPacienteService(paciente_id as string);
        res.json({ success: true, data: citas });
    } catch (error) { next(error); }
}

export async function getAgendaSlotsController(req: Request, res: Response, next: NextFunction) {
    try {
        const { fecha, duracion } = req.query;
        const agenda = await generarAgendaDiaService(fecha as string, duracion ? parseInt(duracion as string) : 30);
        res.json({success: true, data: agenda});
    } catch (error) {next(error);}
}
