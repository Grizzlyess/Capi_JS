// src/hooks/useSession.ts
import { useEffect, useState } from "react";
import api from "../services/api";

export interface User {
    id: string;
    email: string;
    name?: string;
}

export function useSession() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function login(email: string, pass: string) {
        const { data } = await api.post<User>("/user/login", {
            email: email,
            pass: pass
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

    return {
        user,
        loading,
        login,
        logout
    };
}