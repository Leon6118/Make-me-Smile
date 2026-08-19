import { Router } from "express";
import { createEspecialistaController, getEspecialistasController, getEspecialistaByIdController, updateEspecialistaController } from "./especialistas.controller";

const router = Router();

router.post("/", createEspecialistaController);

router.get("/", getEspecialistasController);

router.get("/:id", getEspecialistaByIdController);

router.put("/:id", updateEspecialistaController);

export default router;
