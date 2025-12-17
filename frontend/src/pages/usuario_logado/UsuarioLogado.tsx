import Navegacao from "../../components/nav/nav";
import { useNavigate } from "react-router-dom";
import "./UsuarioLogado.css";

const UsuarioLogado = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="logado d-flex flex-column min-vh-100">
                <Navegacao titulo="" />
                <div className="d-flex flex-grow-1 justify-content-center align-items-center align-self-center">
                    <main className="d-flex flex-column align-items-center justify-content-center">
                        <h3 className="mb-4">Olá, usuário</h3>
                        <ul className="lista">
                            <li className="mb-3">
                                <span>
                                    <img src="src/assets/calculadora.png" alt="" />
                                </span>

                                <a href="" onClick={()=>navigate("/calc")}>Calculadora de Carbono</a>
                            </li>
                            <li className="mb-3">
                                <span>
                                    <img src="src/assets/lista2.png" alt="" />
                                </span>

                                <a href="" onClick={()=>navigate("/empresas")}>Listar Empresas</a>
                            </li>
                        </ul>
                    </main>
                </div>
            </div>
        </>
    );
};

export default UsuarioLogado;
