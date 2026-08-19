import { Router } from "express";
import { createUserController, updatePasswordController, getUsersController } from "./usuarios.controller";

const router = Router();
router.post("/", createUserController);
router.put("/password", updatePasswordController);
router.get("/", getUsersController);

export default router;
