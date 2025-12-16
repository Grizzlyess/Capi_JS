// hooks/useSession.ts
import { useEffect, useState } from "react";
import api from "../services/api";

export interface User {
  id: number;
  email: string;
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    const { data } = await api.post<User>("/user/login", { email:email, pass:password });
    setUser(data);
  }

  async function logout() {
    await api.post("/user/logout");
    setUser(null);
  }

  useEffect(() => {
    api
      .get<User>("user/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
}
