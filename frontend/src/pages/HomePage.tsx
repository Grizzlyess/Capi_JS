// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import "../styles/pages/HomePage.css";
import Navegacao from "../components/nav";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="homePage d-flex flex-column">
            <Navegacao titulo="Dashboard" />

            <main className="homeMain d-flex flex-column align-items-center flex-grow-1">
                <div className="homeHero text-center">
                    <img
                        src="src/assets/capi.svg"
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
                        <p className="homeDate">Feito em 06/03/2026</p>
                        <p className="homeText">
                            Você está no caminho certo para reduzir seus impactos!
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

                <section className="homeWideCard">
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
                </section>
            </main>
        </div>
    );
};

export default Home;