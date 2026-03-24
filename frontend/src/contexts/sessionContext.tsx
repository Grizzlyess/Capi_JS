import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";

export interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

type SessionContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function login(email: string, pass: string) {
        const { data } = await api.post<User>("/user/login", {
            email,
            pass
        });
        setUser(data);
    }

    async function logout() {
        await api.post("/user/logout");
        setUser(null);
    }

    useEffect(() => {
        api.get<User>("/user/login/me")
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SessionContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error("useSession deve ser usado dentro de SessionProvider");
    }

    return context;
}