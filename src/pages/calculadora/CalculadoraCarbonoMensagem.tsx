import Navegacao from "../../components/nav/nav";
import "./CalculadoraCarbonoMensagem.css";

const CalculadoraCarbonoMensagem = () =>{
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navegacao titulo=""/>

                <div className="d-flex flex-grow-1 justify-content-center align-items-center align-self-center">
                    <main className="mensagem d-flex flex-column align-items-center justify-content-center">
                        <dl className="mb-5 d-flex flex-column align-items-center">
                            <dt>
                                Pegada de Carbono Atual:
                            </dt>
                            <dd>
                                Valor aqui!
                            </dd>
                        </dl>
                        <p className="mb-5 text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi hic quae quasi est, ipsa minus fugit earum provident quod ducimus iusto illo quos. Praesentium exercitationem repellendus assumenda et dolores cupiditate.
                        </p>
                        <button className="btn btn-success btn-lg">
                            Entendi
                        </button>
                    </main>
                </div>
            </div>

        </>
    );
}
export default CalculadoraCarbonoMensagem;