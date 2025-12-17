import "./CalculadoraCarbono.css";
import api from "../services/api";
import { useSession } from "../hooks/useSession";
import { useState } from "react";

const CalculadoraCarbono = () => {
    const { user } = useSession();
    const [EvlrM, setEvlrM] = useState(0.0);
    const [EvlrR, setEvlrR] = useState(0.0);
    const [QtdB, setQtdB] = useState(0.0);
    const [KmM, setKmM] = useState(0.0);
    const [Vp, setVp] = useState("");
    const [Cbp, setCbp] = useState("");

    function sendApi(vlr: number) {
        if (user) api.post("/calculo/", { userId: user.id, resultado: vlr });
        else return console.log("Não logado");
        console.log("Calculo Posted!");
    }

    function Calcular() {
        const carbElec = (EvlrM / EvlrR) * 0.0385;
        const carbGas = QtdB * 2.938;
        let carbKm = 0.0;
        if (Vp == "carro") {
            if (Cbp == "diesel") carbKm = (KmM / 12.3) * 2.44;
            else if (Cbp == "etanol") carbKm = (KmM / 11.4) * 1.5;
            else if (Cbp == "gasolina") carbKm = (KmM / 17.5) * 2.19;
            else carbKm = (KmM / 16) * 1.92;
        } else if (Vp === "moto") {
            if (Cbp == "etanol") carbKm = (KmM / 24.7) * 1.5;
            else carbKm = (KmM / 35) * 2.19;
        } else carbKm = 0;
        const carbTotal = carbElec + carbGas + carbKm;
        sendApi(carbTotal);
    }
    return (
        <>
            <div className="py-3">
                <nav className="navbar d-flex justify-content-center position-relative mb-3">
                    <a className="navbar-brand position-absolute start-0 ms-3" href="">
                        <img src="src/assets/arrow-left-solid-full.svg" alt="" width={35} />
                    </a>
                    <h2 className="m-0">Responda as questões</h2>
                </nav>

                <form action="" className="container">
                    {/*Energia mensal*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe o valor mensal da sua conta de energia
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            onChange={(e) => setEvlrM(parseFloat(e.target.value))}
                        />
                    </div>

                    {/*Preço do kWh - região*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe o preço do kWh na sua região
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            onChange={(e) => setEvlrR(parseFloat(e.target.value))}
                        />
                    </div>

                    {/*Qtd botijões - mês*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe a quantidade de botijões de gas usados no mês
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            onChange={(e) => setQtdB(parseFloat(e.target.value))}
                        />
                    </div>

                    {/*Tipo de veículo*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Selecione seu tipo de veículo pessoal mais usado
                        </label>
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setVp(e.target.value);
                                setCbp("");
                            }}
                        >
                            <option selected>Escolha seu veículo</option>
                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                            <option value="bike">Bike</option>
                        </select>
                    </div>
                    {
                        /*Tipo de combustível - carro*/
                        Vp === "carro" && (
                            <div className="mb-4">
                                <label htmlFor="" className="form-label">
                                    Selecione o tipo de combustível do seu carro
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setCbp(e.target.value)}
                                >
                                    <option selected>Selecione o combustível</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="etanol">Etanol</option>
                                    <option value="gasolina">Gasolina</option>
                                    <option value="gnv">GNV</option>
                                </select>
                            </div>
                        )
                    }
                    {
                        /*Tipo de combustível - moto*/
                        Vp === "moto" && (
                            <div className="mb-4">
                                <label htmlFor="" className="form-label">
                                    Selecione o tipo de combustível da sua moto
                                </label>
                                <select className="form-select">
                                    <option selected>Selecione o combustível</option>
                                    <option value="etanol">Etanol</option>
                                    <option value="gasolina">Gasolina</option>
                                </select>
                            </div>
                        )
                    }

                    {/*>Quilômetros que você anda por mês*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe quantos quilômetros você anda por mês
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            onChange={(e) => setKmM(parseFloat(e.target.value))}
                        />
                    </div>

                    {/*Redirecionar Calcular*/}
                    <div className="d-grid gap-2 col-7 mx-auto">
                        <a href="">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg"
                                style={{ width: "800px" }}
                                onClick={Calcular}
                            >
                                Calcular
                            </button>
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};
export default CalculadoraCarbono;
