import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import "./Login.css";
import { useState } from "react";

const Login = () => {
    const { user, login } = useSession();
    const [email, setemail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const toCad = () => {
        navigate("/cadastro");
    };

    const handleLogin = async () => {
        await login(email, pass);
        navigate("/");
    };
    if (user) return <Navigate to="/" />;

    return (
        <div className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.svg" alt="" />
            </div>
            <div className="login p-3">
                <h3 className="mb-5">CAPI - Login</h3>
                <div className="forms w-100">
                    <div className="form mb-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className="form mb-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn logcad w-100 mb-3 mt-4"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="register justify-content-center">
                        <p>
                            Não tem conta? <a onClick={toCad}>Registre-se</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
