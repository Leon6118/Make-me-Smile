import { Router } from "express";
import { createPagoController, getPagosByTratamientoController, getPagosByPacienteController, getPagoByIdController, deletePagoController } from "./pagos.controller";

const router = Router();

router.post("/", createPagoController);
router.get("/by-tratamiento", getPagosByTratamientoController);
router.get("/by-paciente", getPagosByPacienteController);
router.get("/:id", getPagoByIdController);
router.delete("/:id", deletePagoController);

export default router;
