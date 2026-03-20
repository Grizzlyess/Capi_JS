// src/pages/user/Login.tsx
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import "./../../styles/pages/Login.css";
import capiIcon from "@/assets/capi.svg"

const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useSession();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [erro, setErro] = useState("");

    if (user) return <Navigate to="/" />;

    const handleLogin = async () => {
        try {
            setErro("");
            await login(email, pass);
            navigate("/");
        } catch {
            setErro("Email ou senha inválidos.");
        }
    };

    return (
        <div className="loginPage d-flex flex-column min-vh-100 justify-content-center align-items-center">

            <div className="loginCard">

                <div className="loginLogo mb-3 text-center">
                    <img src={capiIcon} alt="CAPI" />
                </div>

                <h2 className="loginTitle mb-4 text-center">
                    CAPI - Login
                </h2>

                <div className="formGroup mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="formGroup mb-4">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                {erro && (
                    <p className="loginError">
                        {erro}
                    </p>
                )}

                <button
                    className="btnLogin"
                    onClick={handleLogin}
                >
                    Entrar
                </button>

                <div className="loginRegister mt-3 text-center">
                    <span>Não tem conta?</span>
                    <button
                        className="linkBtn"
                        onClick={() => navigate("/cadastro")}
                    >
                        Registrar-se
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;