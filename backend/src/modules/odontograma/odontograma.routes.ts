import { Router } from "express";
import { upsertOdontogramaController, getOdontogramaPacienteController, deleteOdontogramaController } from "./odontograma.controller";

const router = Router();

router.post("/", upsertOdontogramaController);
router.get("/", getOdontogramaPacienteController);
router.delete("/:id", deleteOdontogramaController);

export default router;
