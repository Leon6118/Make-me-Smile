import { Router } from "express";
import { createArchivoController, getArchivosByHistorialController, getArchivoByIdController, updateArchivoController, deleteArchivoController } from "./archivos.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post("/", upload.single("file"), createArchivoController);
router.get("/", getArchivosByHistorialController);
router.get("/:id", getArchivoByIdController);
router.put("/:id", updateArchivoController);
router.delete("/:id", deleteArchivoController);

export default router;
