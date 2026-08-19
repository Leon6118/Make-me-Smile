import { useAuth } from "../modules/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: any) {
    const { token } = useAuth();
    if (!token) {return <Navigate to="/" />;}
    return children;
}
