import { createContext, useContext, useState } from "react";

interface User {
    id: string;
    nombre: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    function login(data: any) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)!;
}
