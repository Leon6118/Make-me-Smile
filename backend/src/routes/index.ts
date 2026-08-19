import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import usuariosRoutes from "../modules/usuarios/usuarios.routes";
import especialistasRoutes from "../modules/especialistas/especialistas.routes";
import pacientesRoutes from "../modules/pacientes/pacientes.routes";
import consultoriosRoutes from "../modules/consultorios/consultorios.routes";
import citasRoutes from "../modules/citas/citas.routes";
import historialRouter from "../modules/historial/historial.routes"
import archivosRoutes from "../modules/archivos/archivos.routes";
import clinicasRoutes from "../modules/clinicas/clinicas.routes";
import rolesRoutes from "../modules/roles/roles.routes";
import tratamientosRoutes from "../modules/tratamientos/tratamientos.routes";
import pagosRoutes from "../modules/pagos/pagos.routes";
import odontogramaRoutes from "../modules/odontograma/odontograma.routes";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "API Make me Smile funcionando"
    });
});

router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/especialistas", especialistasRoutes);
router.use("/pacientes", pacientesRoutes);
router.use("/consultorios", consultoriosRoutes);
router.use("/citas", citasRoutes);
router.use("/historial", historialRouter);
router.use("/archivos", archivosRoutes);
router.use("/clinicas", clinicasRoutes);
router.use("/roles", rolesRoutes);
router.use("/tratamientos", tratamientosRoutes);
router.use("/pagos", pagosRoutes);
router.use("/odontograma", odontogramaRoutes);

export default router;
