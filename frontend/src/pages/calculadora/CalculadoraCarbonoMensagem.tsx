// src/pages/calculadora/CalculadoraCarbonoMensagem.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import "./../../styles/pages/CalculadoraCarbonoMensagem.css";

interface MSG {
  texto: string;
  nivel: string;
  min: number;
  max: number;
}

const CalculadoraCarbonoMensagem = () => {
  const navigate = useNavigate();
  const { user } = useSession();

  const [msgs, setMsgs] = useState<MSG[]>([]);
  const [msg, setMsg] = useState("");
  const [carb, setCarb] = useState(0);

  // Buscar último cálculo
  useEffect(() => {
    if (!user) return;

    const fetchCarb = async () => {
      try {
        const resp = await api.get(`/calculo/user/${user.id}`);
        const ultimo = resp.data[0];

        if (ultimo) {
          setCarb(ultimo.valorTotal);
        }
      } catch {
        console.log("Erro ao buscar pegada de carbono");
      }
    };

    fetchCarb();
  }, [user]);

  // Buscar mensagens
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const resp = await api.get("/mensagem");
        setMsgs(resp.data);
      } catch {
        console.log("Erro ao buscar mensagens");
      }
    };

    fetchMsg();
  }, []);

  // Selecionar mensagem correta
  useEffect(() => {
    if (!msgs.length) return;

    const encontrada = msgs.find(
      (m) => carb >= m.min && carb <= m.max
    );

    if (encontrada) {
      setMsg(encontrada.texto);
    }
  }, [carb, msgs]);

  return (
    <>
      <Navegacao titulo="Pegada de Carbono" />

      <div className="respostaPage d-flex justify-content-center align-items-center">
        <main className="respostaCard text-center">

          <h2 className="respostaTitulo mb-4">
            Resultado da Pegada de Carbono
          </h2>

          <div className="respostaValor mb-4">
            {carb.toFixed(2)} Kg CO₂e
          </div>

          <p className="respostaMensagem mb-5">
            {msg || "Calculando impacto..."}
          </p>

          <button
            className="btnEntendi"
            onClick={() => navigate("/perfil")}
          >
            Entendi
          </button>

        </main>
      </div>
    </>
  );
};

export default CalculadoraCarbonoMensagem;