import { useEffect, useState } from "react";
import api from "../services/api";
import { useSession } from "./useSession";

interface MSG {
    texto: string;
    nivel: string;
    min: number;
    max: number;
}

export const useCarbonoResumo = () => {
    const { user } = useSession();

    const [msgs, setMsgs] = useState<MSG[]>([]);
    const [msg, setMsg] = useState("");
    const [carb, setCarb] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const [respCarb, respMsgs] = await Promise.all([
                    api.get(`/calculo/user/${user.id}`),
                    api.get("/mensagem"),
                ]);

                const ultimo = respCarb.data?.[0];
                const mensagens = respMsgs.data ?? [];

                setMsgs(mensagens);

                if (ultimo) {
                    setCarb(ultimo.valorTotal);

                    const encontrada = mensagens.find(
                        (m: MSG) => ultimo.valorTotal >= m.min && ultimo.valorTotal <= m.max
                    );

                    if (encontrada) {
                        setMsg(encontrada.texto);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar resumo de carbono:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return { carb, msg, msgs, loading };
};