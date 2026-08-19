import { Router } from "express";
import { createRolController, getRolesController, getRolByIdController, updateRolController, deleteRolController } from "./roles.controller";

const router = Router();

router.post("/", createRolController);

router.get("/", getRolesController);

router.get("/:id", getRolByIdController);

router.put("/:id", updateRolController);

router.delete("/:id", deleteRolController);

export default router;
