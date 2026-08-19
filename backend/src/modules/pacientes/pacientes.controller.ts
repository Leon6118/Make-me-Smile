import { Request, Response, NextFunction } from "express";
import { createPacienteService, getPacientesService, searchPacientesService, getPacienteByIdService, updatePacienteService } from "./pacientes.service";

interface ParamsId {id: string;}

export async function createPacienteController(req: Request, res: Response, next: NextFunction) {
    try{
        const paciente = await createPacienteService(req.body);
        res.json({success: true, data: paciente});
    } catch (error) {next(error);}
}

export async function getPacientesController(req: Request, res: Response, next: NextFunction) {
    try {
        const pacientes = await getPacientesService();
        res.json({success: true, data: pacientes});
    } catch (error) {next(error);}
}

export async function searchPacientesController(req: Request, res: Response, next: NextFunction) {
    try {
        const { search } = req.query;
        const pacientes = await searchPacientesService(search as string);
        res.json({success: true, data: pacientes});
    } catch (error) {next(error);}
}

export async function getPacienteByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const paciente = await getPacienteByIdService(req.params.id);
        res.json({success: true, data: paciente});
    } catch (error) {next(error);}
}

export async function updatePacienteController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const paciente = await updatePacienteService(req.params.id, req.body);
        res.json({success: true, data: paciente});
    } catch (error) {next(error);}
}
