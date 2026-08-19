import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { AuthProvider } from './modules/auth/context/AuthContext';
import "./api/interceptors";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
