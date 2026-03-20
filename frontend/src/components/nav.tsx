import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import "../styles/components/NavBar.css";
import setaIcon from "@/assets/arrow-left-solid-full.svg";

type NavegacaoProps = {
    titulo?: string;
};

const Navegacao = ({ titulo = "padrao" }: NavegacaoProps) => {
    const navigate = useNavigate();
    const { user, logout } = useSession();

    const handleOut = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="navbar justify-content-between mb-3 px-4">
            <button
                type="button"
                className="navbar-brand border-0 bg-transparent p-0"
                onClick={() => navigate("/")}
            >
                <img src={setaIcon} alt="" width={35} />
            </button>

            <h2 className="titulo m-0">{titulo}</h2>

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
                        <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => navigate("/perfil")}
                        >
                            {user?.name}
                        </button>
                        {user && user.role === "ADMIN" ? (
                            <button className="dropdown-item" onClick={() => navigate("/admin")}>
                                Central Admin
                            </button>
                        ) : null}
                        <button
                            type="button"
                            className="dropdown-item"
                            onClick={handleOut}
                        >
                            Sair
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navegacao;