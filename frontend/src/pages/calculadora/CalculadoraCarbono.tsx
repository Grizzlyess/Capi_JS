import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import "./../../styles/pages/CalculadoraCarbono.css";

const CalculadoraCarbono = () => {
    const navigate = useNavigate();
    const { user } = useSession();

    const [energia, setEnergia] = useState("");
    const [precoKwh, setPrecoKwh] = useState("");
    const [mesesPorBotijao, setMesesPorBotijao] = useState("");
    const [kmMes, setKmMes] = useState("");

    const [tipoVeiculo, setTipoVeiculo] = useState("");
    const [combustivel, setCombustivel] = useState("");

    const [resultado, setResultado] = useState<number | null>(null);
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    const toNumber = (value: string) => {
        if (value.trim() === "") return 0;
        return Number(value);
    };

    const validar = () => {
        const energiaNum = toNumber(energia);
        const precoKwhNum = toNumber(precoKwh);
        const mesesBotijaoNum = toNumber(mesesPorBotijao);
        const kmMesNum = toNumber(kmMes);

        if (!user) {
            setErro("Você precisa estar logado.");
            return false;
        }

        if (
            energiaNum < 0 ||
            precoKwhNum < 0 ||
            mesesBotijaoNum < 0 ||
            kmMesNum < 0
        ) {
            setErro("Os valores não podem ser negativos.");
            return false;
        }

        if ((tipoVeiculo === "carro" || tipoVeiculo === "moto") && !combustivel) {
            setErro("Selecione o combustível do veículo.");
            return false;
        }

        setErro("");
        return true;
    };

    const calcularTotal = () => {
        const energiaNum = toNumber(energia);
        const precoKwhNum = toNumber(precoKwh);
        const mesesBotijaoNum = toNumber(mesesPorBotijao);
        const kmMesNum = toNumber(kmMes);

        const carbElec =
            precoKwhNum > 0 ? (energiaNum / precoKwhNum) * 0.0385 : 0;

        const consumoMensalBotijao =
            mesesBotijaoNum > 0 ? 1 / mesesBotijaoNum : 0;
        const carbGas = consumoMensalBotijao * 2.938;

        let carbKm = 0;

        if (tipoVeiculo === "carro") {
            if (combustivel === "diesel") carbKm = (kmMesNum / 12.3) * 2.44;
            else if (combustivel === "etanol") carbKm = (kmMesNum / 11.4) * 1.5;
            else if (combustivel === "gasolina") carbKm = (kmMesNum / 17.5) * 2.19;
            else if (combustivel === "gnv") carbKm = (kmMesNum / 16) * 1.92;
        } else if (tipoVeiculo === "moto") {
            if (combustivel === "etanol") carbKm = (kmMesNum / 24.7) * 1.5;
            else if (combustivel === "gasolina") carbKm = (kmMesNum / 35) * 2.19;
        }

        return carbElec + carbGas + carbKm;
    };

    const calcular = async () => {
        if (!validar()) {
            setResultado(null);
            return;
        }

        const total = calcularTotal();
        setResultado(total);

        try {
            setSalvando(true);

            await api.post("/calculo", {
                userId: user!.id,
                resultado: total,
            });

            navigate("/calcm");
        } catch {
            setErro("Erro ao salvar cálculo.");
        } finally {
            setSalvando(false);
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
                            min={0}
                            value={energia}
                            onChange={(e) => setEnergia(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="calcGroup mb-3">
                        <label>Preço do kWh (R$)</label>
                        <input
                            type="number"
                            min={0}
                            value={precoKwh}
                            onChange={(e) => setPrecoKwh(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="calcGroup mb-3">
                        <label>Em média, você troca seu botijão a cada quantos meses?</label>
                        <input
                            type="number"
                            min={0}
                            step="0.1"
                            value={mesesPorBotijao}
                            onChange={(e) => setMesesPorBotijao(e.target.value)}
                            className="form-control"
                            placeholder="Ex: 1, 2, 0.5..."
                        />
                    </div>

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

                    <div className="calcGroup mb-4">
                        <label>Km rodados por mês</label>
                        <input
                            type="number"
                            min={0}
                            value={kmMes}
                            onChange={(e) => setKmMes(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {erro && (
                        <p className="text-danger mb-3">{erro}</p>
                    )}

                    {resultado !== null && !erro && (
                        <p className="text-success mb-3">
                            Resultado estimado: {resultado.toFixed(2)} kg CO₂/mês
                        </p>
                    )}

                    <button
                        className="btnCalcular"
                        onClick={calcular}
                        disabled={salvando}
                    >
                        {salvando ? "Salvando..." : "Calcular Pegada"}
                    </button>
                </main>
            </div>
        </>
    );
};

export default CalculadoraCarbono;