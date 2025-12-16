const CalculadoraCarbono = () =>{
    return (
        <>
            <div className="container">
                <p>Responda as questões</p>

                <form action="">
                    {/*Energia mensal*/}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">
                            Informe o valor mensal da sua conta de energia
                        </label>
                        <input type="number" className="form-control"/>
                    </div>
                    
                    {/*Preço do kWh - região*/}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">
                            Informe o preço do kWh na sua região
                        </label>
                        <input type="text" className="form-control"/>
                    </div>

                    {/*Qtd botijões - mês*/}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">
                            Informe a quantidade de botijões de gas usados no mês
                        </label>
                        <input type="text" className="form-control"/>
                    </div>

                    {/*Tipo de veículo*/}
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">
                            Informe quantos quilômetros você anda por mês
                        </label>
                        <input type="text" className="form-control"/>
                    </div>
                </form>
            </div>

        </>
    );
}
export default CalculadoraCarbono