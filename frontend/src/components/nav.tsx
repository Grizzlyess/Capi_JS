type NavegacaoProps = {
    titulo?: string
};

import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import "../styles/components/NavBar.css"

const Navegacao = ({ titulo = "padrao" }: NavegacaoProps) => {
    const navigate = useNavigate()
    const { user } = useSession()
    const { logout } = useSession()

    const handleOut = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar justify-content-between mb-3 px-4">
            <a className="navbar-brand" href="" onClick={() => navigate("/")}>
                <img src="src/assets/arrow-left-solid-full.svg" alt="" width={35} />
            </a>

            <h2 className="titulo m-0">
                {titulo}
            </h2>

            <div className="btn-group">
                <button
                    className="perfil"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a
                            className="dropdown-item"
                            href=""
                            onClick={() => navigate("/perfil")}
                        >
                            {user?.name}
                        </a>

                        <a
                            className="dropdown-item"
                            href=""
                            onClick={handleOut}
                        >
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navegacao;