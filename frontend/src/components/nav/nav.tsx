type NavegacaoProps = {
    titulo?: string
};
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

const Navegacao = ({titulo = "padrao"}:NavegacaoProps) => {
    const navigate = useNavigate()
    const {logout} = useSession()
    const handleOut = () =>{
        logout()
    }

    return (
        <nav className="navbar justify-content-between mb-3 px-4">
            <a className="navbar-brand" href="" onClick={()=>navigate("/")}>
                <img src="src/assets/arrow-left-solid-full.svg" alt="" width={35}/>
            </a>
            <h2 className="m-0">
                {titulo}
            </h2>
            <div className="btn-group">
                <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Conta
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a className="dropdown-item" href="" onClick={()=>navigate("/perfil")}>
                            Perfil
                        </a>
                        <a className="dropdown-item" href="" onClick={handleOut}>
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
            
        </nav>
    );
};
export default Navegacao;