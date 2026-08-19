import { Request, Response, NextFunction } from "express";
import { createUserService, updatePasswordService, getUsersService } from "./usuarios.service";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await createUserService(req.body);
        res.json({success: true, data: user});
    } catch (error) {next(error);}
}

export async function updatePasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const result = await updatePasswordService(email, password);
        res.json({success: true, data: result});
    } catch (error) {next(error);}
}

export async function getUsersController(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsersService();
        res.json({success: true, data: users});
    } catch (error) {next(error);}
}
