import { Router } from "express";
import { createHistorialController, getHistorialPacienteController, getHistorialByIdController, updateHistorialController } from "./historial.controller";

const router = Router();

router.post("/", createHistorialController);

router.get("/", getHistorialPacienteController);

router.get("/:id", getHistorialByIdController);

router.put("/:id", updateHistorialController);

export default router;
