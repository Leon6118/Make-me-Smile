import { Router } from "express";
import { getClinicasController } from "./clinicas.controller";

const router = Router();

router.get("/", getClinicasController);

export default router;
