import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkLogin() {
        try {
            const res = await fetch(`${API_URL}/user/check`, {
                credentials: "include", // essential for cookies
            });
            const data = await res.json();

            if (data.loggedIn) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checkLogin, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
