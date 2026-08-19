import { Router } from "express";
import { createConsultorioController, getConsultoriosController,getConsultorioByIdController, updateConsultorioController, deleteConsultorioController } from "./consultorios.controller";

const router = Router();

router.post("/", createConsultorioController);

router.get("/", getConsultoriosController);

router.get("/:id", getConsultorioByIdController);

router.put("/:id", updateConsultorioController);

router.delete("/:id", deleteConsultorioController);

export default router;
