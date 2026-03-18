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

    const [tipoVeiculo, setTipoVeiculo] = useState("");
    const [combustivel, setCombustivel] = useState("");

    const calcular = async () => {
        if (!user) {
            console.log("Não logado");
            return;
        }

        // 🔥 lógica da V1 (mantida)
        const carbElec = precoKwh > 0 ? (energia / precoKwh) * 0.0385 : 0;
        const carbGas = botijoes * 2.938;

        let carbKm = 0;

        if (tipoVeiculo === "carro") {
            if (combustivel === "diesel") carbKm = (kmMes / 12.3) * 2.44;
            else if (combustivel === "etanol") carbKm = (kmMes / 11.4) * 1.5;
            else if (combustivel === "gasolina") carbKm = (kmMes / 17.5) * 2.19;
            else carbKm = (kmMes / 16) * 1.92; // GNV
        } else if (tipoVeiculo === "moto") {
            if (combustivel === "etanol") carbKm = (kmMes / 24.7) * 1.5;
            else carbKm = (kmMes / 35) * 2.19;
        } else {
            carbKm = 0;
        }

        const total = carbElec + carbGas + carbKm;

        try {
            await api.post("/calculo", {
                userId: user.id,
                resultado: total,
            });

            navigate("/calcm");
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

                    {/* Energia */}
                    <div className="calcGroup mb-3">
                        <label>Gasto mensal com energia (R$)</label>
                        <input
                            type="number"
                            min={0}
                            value={energia}
                            onChange={(e) => setEnergia(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    {/* Preço kWh */}
                    <div className="calcGroup mb-3">
                        <label>Preço do kWh (R$)</label>
                        <input
                            type="number"
                            min={0}
                            value={precoKwh}
                            onChange={(e) => setPrecoKwh(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    {/* Botijão */}
                    <div className="calcGroup mb-3">
                        <label>Botijões de gás por mês</label>
                        <input
                            type="number"
                            min={0}
                            value={botijoes}
                            onChange={(e) => setBotijoes(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    {/* Tipo de veículo */}
                    <div className="calcGroup mb-3">
                        <label>Tipo de veículo</label>
                        <select
                            value={tipoVeiculo}
                            onChange={(e) => {
                                setTipoVeiculo(e.target.value);
                                setCombustivel("");
                            }}
                            className="form-control"
                        >
                            <option value="">Escolha seu veículo</option>
                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                            <option value="bike">Bike</option>
                        </select>
                    </div>

                    {/* Combustível - carro */}
                    {tipoVeiculo === "carro" && (
                        <div className="calcGroup mb-3">
                            <label>Combustível do carro</label>
                            <select
                                value={combustivel}
                                onChange={(e) => setCombustivel(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Selecione</option>
                                <option value="diesel">Diesel</option>
                                <option value="etanol">Etanol</option>
                                <option value="gasolina">Gasolina</option>
                                <option value="gnv">GNV</option>
                            </select>
                        </div>
                    )}

                    {/* Combustível - moto */}
                    {tipoVeiculo === "moto" && (
                        <div className="calcGroup mb-3">
                            <label>Combustível da moto</label>
                            <select
                                value={combustivel}
                                onChange={(e) => setCombustivel(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Selecione</option>
                                <option value="etanol">Etanol</option>
                                <option value="gasolina">Gasolina</option>
                            </select>
                        </div>
                    )}

                    {/* KM */}
                    <div className="calcGroup mb-4">
                        <label>Km rodados por mês</label>
                        <input
                            type="number"
                            min={0}
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