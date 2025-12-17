import Navegacao from "../../components/nav/nav";
import "./CalculadoraCarbono.css"

const CalculadoraCarbono = () =>{
    return (
        <>
            <div className="py-3">
                <Navegacao titulo="Responda as questões"/>

                <form action="" className="container">
                    {/*Energia mensal*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe o valor mensal da sua conta de energia
                        </label>
                        <input type="number" className="form-control" min={0}/>
                    </div>
                    
                    {/*Preço do kWh - região*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe o preço do kWh na sua região
                        </label>
                        <input type="number" className="form-control" min={0}/>
                    </div>

                    {/*Qtd botijões - mês*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe a quantidade de botijões de gas usados no mês
                        </label>
                        <input type="number" className="form-control" min={0}/>
                    </div>

                    {/*Tipo de veículo*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Selecione seu tipo de veículo pessoal mais usado
                        </label>
                        <select className="form-select">
                            <option selected >
                                Escolha seu veículo
                            </option>
                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                            <option value="bike">Bike</option>
                        </select>
                    </div>

                    {/*Tipo de combustível - carro*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Selecione o tipo de combustível do seu carro
                        </label>
                        <select className="form-select">
                            <option selected >
                                Selecione o combustível
                            </option>
                            <option value="diesel">Diesel</option>
                            <option value="etanol">Etanol</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="gnv">GNV</option>
                        </select>
                    </div>

                    {/*Tipo de combustível - moto*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Selecione o tipo de combustível da sua moto
                        </label>
                        <select className="form-select">
                            <option selected >
                                Selecione o combustível
                            </option>
                            <option value="etanol">Etanol</option>
                            <option value="gasolina">Gasolina</option>
                        </select>
                    </div>

                    {/*>Quilômetros que você anda por mês*/}
                    <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Informe quantos quilômetros você anda por mês
                        </label>
                        <input type="number" className="form-control" min={0}/>
                    </div>

                    {/*Redirecionar Calcular*/}
                    <div className="">
                        <a href="">
                            <button type="submit" className="btn btn-success btn-lg w-100" >
                                Calcular
                            </button>
                        </a>
                    </div>
                </form>
            </div>

        </>
    );
}
export default CalculadoraCarbono