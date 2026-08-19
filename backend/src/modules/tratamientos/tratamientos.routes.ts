import { Router } from "express";
import { createTratamientoController, getTratamientosByHistorialController, updateTratamientoController, deleteTratamientoController } from "./tratamientos.controller";

const router = Router();

router.post("/", createTratamientoController);
router.get("/by-historial", getTratamientosByHistorialController);
router.put("/:id", updateTratamientoController);
router.delete("/:id", deleteTratamientoController);

export default router;
