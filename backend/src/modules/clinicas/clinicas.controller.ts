import { Request, Response, NextFunction } from "express";
import { getClinicasService } from "./clinicas.service";

export async function getClinicasController(req: Request, res: Response, next: NextFunction) {
    try {
        const clinicas = await getClinicasService();
        res.json({succes: true, data: clinicas});
    } catch (error) {next(error);}
}
