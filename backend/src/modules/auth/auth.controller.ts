import { Request, Response, NextFunction } from "express";
import { loginService } from "./auth.service";

export async function loginController(
    req: Request, res: Response, next: NextFunction
) {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.json({success: true, data: result});
    } catch (error) {next(error);}
}
