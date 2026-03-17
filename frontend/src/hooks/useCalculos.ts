// src/hooks/useCalculos.ts
import { useEffect, useState } from "react";
import api from "../services/api";
import { useSession } from "./useSession";

export interface CalculoCarbono {
    id: string;
    valorTotal: number;
    createdAt: string;
    userId: string;
}

export function useCalculos() {
    const { user } = useSession();
    const [calculos, setCalculos] = useState<CalculoCarbono[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setCalculos([]);
            setLoading(false);
            return;
        }

        api.get<CalculoCarbono[]>(`/calculo/user/${user.id}`)
            .then((res) => setCalculos(res.data))
            .catch(() => setCalculos([]))
            .finally(() => setLoading(false));
    }, [user]);

    return {
        calculos,
        loading
    };
}

export function useUltimoCalculo() {
    const { user } = useSession();
    const [ultimoCalculo, setUltimoCalculo] = useState<number | null>(null);
    const [dataCalculo, setDataCalculo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setUltimoCalculo(null);
            setDataCalculo(null);
            setLoading(false);
            return;
        }

        api.get<CalculoCarbono[]>(`/calculo/user/${user.id}`)
            .then((res) => {
                const ultimo = res.data[0];

                if (!ultimo) {
                    setUltimoCalculo(null);
                    setDataCalculo(null);
                    return;
                }

                setUltimoCalculo(ultimo.valorTotal);
                setDataCalculo(ultimo.createdAt);
            })
            .catch(() => {
                setUltimoCalculo(null);
                setDataCalculo(null);
            })
            .finally(() => setLoading(false));
    }, [user]);

    return {
        ultimoCalculo,
        dataCalculo,
        loading
    };
}

export function calculoRecente(dataCalculo: string | null, dias = 30) {
    if (!dataCalculo) return false;

    const agora = new Date();
    const data = new Date(dataCalculo);

    const diffDias =
        (agora.getTime() - data.getTime()) /
        (1000 * 60 * 60 * 24);

    return diffDias <= dias;
}