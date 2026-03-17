// src/pages/calculadora/CalculadoraCarbono.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import "./../../styles/pages/CalculadoraCarbono.css";

const CalculadoraCarbono = () => {
    const navigate = useNavigate();
    const { user } = useSession();

    const [energia, setEnergia] = useState(0);
    const [precoKwh, setPrecoKwh] = useState(0);
    const [botijoes, setBotijoes] = useState(0);
    const [kmMes, setKmMes] = useState(0);
    const [tipoVeiculo, setTipoVeiculo] = useState("gasolina");

    const calcular = async () => {
        if (!user) return;

        const energiaEmissao = energia * precoKwh * 0.0005;
        const gasEmissao = botijoes * 3;
        const veiculoEmissao =
            tipoVeiculo === "gasolina"
                ? kmMes * 0.192
                : tipoVeiculo === "diesel"
                ? kmMes * 0.171
                : kmMes * 0.120;

        const total = energiaEmissao + gasEmissao + veiculoEmissao;

        try {
            await api.post("/calculo", {
                userId: user.id,
                resultado: total,
            });

            navigate("/resultado");
        } catch {
            console.log("Erro ao salvar cálculo");
        }
    };

    return (
        <>
            <Navegacao titulo="Pegada de Carbono" />

            <div className="calcPage d-flex flex-grow-1 justify-content-center align-items-center">
                <main className="calcCard">

                    <h2 className="calcTitle mb-4 text-center">
                        Calcule sua Pegada de Carbono
                    </h2>

                    <div className="calcGroup mb-3">
                        <label>Gasto mensal com energia (R$)</label>
                        <input
                            type="number"
                            value={energia}
                            onChange={(e) => setEnergia(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    <div className="calcGroup mb-3">
                        <label>Preço do kWh (R$)</label>
                        <input
                            type="number"
                            value={precoKwh}
                            onChange={(e) => setPrecoKwh(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    <div className="calcGroup mb-3">
                        <label>Botijões de gás por mês</label>
                        <input
                            type="number"
                            value={botijoes}
                            onChange={(e) => setBotijoes(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    <div className="calcGroup mb-3">
                        <label>Tipo de veículo</label>
                        <select
                            value={tipoVeiculo}
                            onChange={(e) => setTipoVeiculo(e.target.value)}
                            className="form-control"
                        >
                            <option value="gasolina">Gasolina</option>
                            <option value="diesel">Diesel</option>
                            <option value="etanol">Etanol</option>
                        </select>
                    </div>

                    <div className="calcGroup mb-4">
                        <label>Km rodados por mês</label>
                        <input
                            type="number"
                            value={kmMes}
                            onChange={(e) => setKmMes(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    <button
                        className="btnCalcular"
                        onClick={calcular}
                    >
                        Calcular Pegada
                    </button>

                </main>
            </div>
        </>
    );
};

export default CalculadoraCarbono;