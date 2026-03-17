// src/pages/user/UsuarioLogado.tsx
import { useNavigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import { useSession } from "../../hooks/useSession";
import { useUltimoCalculo } from "../../hooks/useCalculos";
import "./../../styles/pages/UsuarioLogado.css";

const UsuarioLogado = () => {
    const navigate = useNavigate();
    const { user } = useSession();
    const { ultimoCalculo, dataCalculo } = useUltimoCalculo();

    const dataFormatada = dataCalculo
        ? new Date(dataCalculo).toLocaleDateString("pt-BR")
        : "Sem data";

    return (
        <div className="logado d-flex flex-column min-vh-100">
            <Navegacao titulo="Perfil" />

            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <main className="mainUserLog d-flex flex-column align-items-center">

                    <div className="profileImg">
                        {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                    </div>

                    <h3 className="h3User mb-2">
                        Olá, {user?.name || user?.email}
                    </h3>

                    <p className="userMail mb-4">
                        {user?.email}
                    </p>

                    <hr />

                    <div className="ultimo-calculo text-center">
                        <h4 className="calcTitle">📊 Último Cálculo</h4>
                        <p className="calcDate">{dataFormatada}</p>
                        <p className="calcValue">
                            {ultimoCalculo !== null
                                ? `${ultimoCalculo.toFixed(2)} t CO₂`
                                : "Nenhum cálculo"}
                        </p>
                    </div>

                    <hr />

                    <ul className="lista">
                        
                        <li className="linkUser mb-3" onClick={() => navigate("/calcm")}>
                            <span className="iconBox">
                                <img src="src/assets/pegada.png" alt="" />
                            </span>
                            <span>Pegada de Carbono</span>
                        </li>

                        <li className="linkUser mb-3" onClick={() => navigate("/calc")}>
                            <span className="iconBox">
                                <img src="src/assets/calculadora.png" alt="" />
                            </span>
                            <span>Calculadora de Carbono</span>
                        </li>

                        <li className="linkUser mb-3" onClick={() => navigate("/empresas")}>
                            <span className="iconBox">
                                <img src="src/assets/lista2.png" alt="" />
                            </span>
                            <span>Listar Empresas</span>
                        </li>
                    </ul>
                </main>
            </div>
        </div>
    );
};

export default UsuarioLogado;