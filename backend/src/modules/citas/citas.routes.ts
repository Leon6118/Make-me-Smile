import { Router } from "express";
import { createCitaController, getAgendaDiaController, getCitaByIdController, updateCitaController, deleteCitaController, getAgendaSlotsController, getCitasByPacienteController } from "./citas.controller";

const router = Router();

router.get("/agenda", getAgendaDiaController);
router.get("/agenda-slots", getAgendaSlotsController);
router.get("/by-paciente", getCitasByPacienteController);
router.get("/:id", getCitaByIdController);
router.post("/", createCitaController);
router.put("/:id", updateCitaController);
router.delete("/:id", deleteCitaController);

export default router;
