import { useNavigate } from "react-router-dom";
import "../styles/pages/HomePage.css";
import Navegacao from "../components/nav";
import capiLogo from "../assets/capi.svg";
import { useUltimoCalculo } from "../hooks/useCalculos";
import { useCarbonoResumo } from "../hooks/useCarbonoResumo";

const Home = () => {
    const navigate = useNavigate();
    const { ultimoCalculo, dataCalculo } = useUltimoCalculo();
    const { msg } = useCarbonoResumo();
    
    const dataFormatada = dataCalculo
        ? new Date(dataCalculo).toLocaleDateString("pt-BR")
        : "Sem data";

    return (
        <div className="homePage d-flex flex-column">
            <Navegacao titulo="Dashboard" />

            <main className="homeMain d-flex flex-column align-items-center flex-grow-1">
                <div className="homeHero text-center">
                    <img
                        src={capiLogo}
                        alt="CAPI"
                        className="homeLogo mb-3"
                    />

                    <h1 className="homeTitle">Olá! Bem-vindo(a) à CAPI</h1>
                    <p className="homeSubtitle">
                        Acompanhe seus gastos e sua pegada de carbono com tranquilidade.
                    </p>
                </div>

                <section className="homeGrid">
                    <div className="homeCard">
                        <h2 className="homeCardTitle">📊 Último Cálculo</h2>
                        <p className="homeDate">{dataFormatada}</p>
                        <p className="calcValueHome">
                            {ultimoCalculo !== null
                                ? `${ultimoCalculo.toFixed(2)} t CO₂`
                                : "Nenhum cálculo"}
                        </p>
                        <p className="respostaMensagem mb-5">
                            {msg || "Calcule sua Pegada de Carbono"}
                        </p>
                    </div>

                    <div className="homeCard">
                        <h2 className="homeCardTitle">🌱 Calcular sua emissão de carbono</h2>
                        <p className="homeText">
                            Quer atualizar seus dados de consumo deste mês?
                        </p>
                        <button
                            className="homeBtnPrimary"
                            onClick={() => navigate("/calc")}
                        >
                            Preencher Questionário
                        </button>
                    </div>
                </section>

                <section className="homeGrid">
                    <div className="homeCard">
                        <h2 className="homeCardTitle">🔎 Radar de Sustentabilidade</h2>
                        <p className="homeText">
                            Descubra se as empresas que você consome possuem metas validadas pela SBTi.
                        </p>
                        <button
                            className="homeBtnSecondary"
                            onClick={() => navigate("/empresas")}
                        >
                            Consultar Empresas
                        </button>
                    </div>

                    <div className="homeCard">
                        <h2 className="homeCardTitle">🛒 Catálogo de Produtos</h2>
                        <p className="homeText">
                            Pesquise produtos e veja o ecoscore de cada item.
                        </p>
                        <button
                            className="homeBtnSecondary"
                            onClick={() => navigate("/produtos")}
                        >
                            Consultar Produtos
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;