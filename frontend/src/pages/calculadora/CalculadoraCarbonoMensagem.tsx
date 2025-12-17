import Navegacao from "../../components/nav/nav";
import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import "./CalculadoraCarbonoMensagem.css";
import { useEffect, useState } from "react";

interface MSG {
    texto: string;
    nivel: string;
    min: number;
    max: number;
}

const CalculadoraCarbonoMensagem = () => {
    const [msgs, setMsg] = useState<MSG[] | null>(null);
    const [msg, setTxt] = useState("");
    const [carb, setCarb] = useState(0);
    const { user } = useSession();

    useEffect(() => {
        if (!user) return;

        const fetchCarb = async () => {
            try {
                const resp = await api.get(`/calculo/user/${user.id}`);
                setCarb(resp.data[0].valorTotal ?? []);
            } catch {
                console.log("Erro ao buscar pegada de carbono");
            }
        };
        fetchCarb();
    }, [user]);
    useEffect(() => {
        const fetchMsg = async () => {
            try {
                const resp = await api.get("/mensagem");
                setMsg(resp.data);
                const tmp = msgs?.find(txt => txt.min>carb)
                if (tmp) setTxt(tmp?.texto)
            } catch {
                console.log("Erro ao buscar mensagens");
            }
        };
        fetchMsg();
    }, [carb,msgs]);

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navegacao titulo="Pegada de Carbono" />
                <div className="d-flex flex-grow-1 justify-content-center align-items-center align-self-center">
                    <main className="mensagem d-flex flex-column align-items-center justify-content-center">
                        <dl className="mb-5 d-flex flex-column align-items-center">
                            <dt>Pegada de Carbono Atual:</dt>
                            <dd>{carb} Kg CO2e</dd>
                        </dl>
                        <p className="mb-5 text-center">
                            {msg}
                        </p>
                        <button className="btn btn-success btn-lg">Entendi</button>
                    </main>
                </div>
            </div>
        </>
    );
};
export default CalculadoraCarbonoMensagem;
