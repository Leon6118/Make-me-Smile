import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../modules/auth/pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import PacientesPage from "../modules/pacientes/pages/PacientesPage";
import HistorialPage from "../modules/historial/pages/HistorialPage";
import CitasPage from "../modules/citas/pages/CitasPage";
import EspecialistasPage from "../modules/especialistas/pages/EspecialistasPage";
import ConsultoriosPage from "../modules/consultorios/pages/ConsultoriosPage";
import UsuariosPage from "../modules/usuarios/pages/UsuariosPage";
import RolesPage from "../modules/roles/pages/RolesPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<PrivateRoute><MainLayout><DashboardPage /></MainLayout></PrivateRoute>} />
            <Route path="/pacientes" element={<PrivateRoute><MainLayout><PacientesPage /></MainLayout></PrivateRoute>} />
            <Route path="/historial/:id" element={<PrivateRoute><MainLayout><HistorialPage /></MainLayout></PrivateRoute>} />
            <Route path="/citas" element={<PrivateRoute><MainLayout><CitasPage /></MainLayout></PrivateRoute>} />
            <Route path="/especialistas" element={<PrivateRoute><MainLayout><EspecialistasPage /></MainLayout></PrivateRoute>} />
            <Route path="/consultorios" element={<PrivateRoute><MainLayout><ConsultoriosPage /></MainLayout></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><MainLayout><UsuariosPage /></MainLayout></PrivateRoute>} />
            <Route path="/roles" element={<PrivateRoute><MainLayout><RolesPage /></MainLayout></PrivateRoute>} />
        </Routes>
        </BrowserRouter>
    );
}
