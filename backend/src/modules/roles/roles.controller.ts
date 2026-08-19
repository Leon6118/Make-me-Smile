import { Request, Response, NextFunction } from "express";
import { createRolService,getRolesService, getRolByIdService, updateRolService, deleteRolService } from "./roles.service";

interface ParamsId {id: string;}

/** Creación de rol */
export async function createRolController(req: Request, res: Response, next: NextFunction) {
    try {
        const rol = await createRolService(req.body);
        res.json({success: true, data: rol});
    } catch (error) {next(error);}
}

/** Obtención de todos los roles */
export async function getRolesController(req: Request, res: Response, next: NextFunction) {
    try {
        const roles = await getRolesService();
        res.json({success: true, data: roles});
    } catch (error) {next(error);}
}

/** Obtención de rol por ID */
export async function getRolByIdController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const rol = await getRolByIdService(req.params.id);
        res.json({success: true, data: rol});
    } catch (error) {next(error);}
}

/** Actualización de rol */
export async function updateRolController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const rol = await updateRolService(req.params.id, req.body);
        res.json({success: true, data: rol});
    } catch (error) {next(error);}
}

/** Eliminación de rol */
export async function deleteRolController(req: Request<ParamsId>, res: Response, next: NextFunction) {
    try {
        const result = await deleteRolService(req.params.id);
        res.json({success: true, data: result});
    } catch (error) {next(error);}
}
