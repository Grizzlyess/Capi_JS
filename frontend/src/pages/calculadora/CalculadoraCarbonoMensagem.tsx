import { useNavigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import "./../../styles/pages/CalculadoraCarbonoMensagem.css";
import { useCarbonoResumo } from "../../hooks/useCarbonoResumo";


const CalculadoraCarbonoMensagem = () => {
  const navigate = useNavigate();
  const { carb, msg } = useCarbonoResumo();

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
            {msg || "Calcule sua Pegada de Carbono"}
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