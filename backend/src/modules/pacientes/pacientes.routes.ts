import { Router } from "express";
import { createPacienteController, getPacientesController, searchPacientesController, getPacienteByIdController, updatePacienteController } from "./pacientes.controller";

const router = Router();

router.post("/", createPacienteController);

router.get("/", getPacientesController);

router.get("/buscar", searchPacientesController);

router.get("/:id", getPacienteByIdController);

router.put("/:id", updatePacienteController);

export default router;
