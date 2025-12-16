import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import "./Login.css";
import { useState } from "react";

const Login = () => {
    const {login} = useSession();
    const [email, setemail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const toCad = () => {
        navigate("/cadastro");
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        await login(email,pass)
        navigate("/");
    };

    return (
        <div className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center">
                <img src="src/assets/capi.svg" alt="" />
            </div>
            <div className="login p-3">
                <h3 className="mb-5">CAPI - Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="forms">
                        <div className="form mb-4">
                            <input type="email" className="form-control" placeholder="Email" onChange={(e)=> setemail(e.target.value)} />
                        </div>
                        <div className="form mb-5">
                            <input type="password" className="form-control" placeholder="Senha" onChange={(e)=> setPass(e.target.value)} />
                        </div>
                        <button type="submit" className="btn logcad w-100 mb-3 mt-4">
                            Login
                        </button>
                        <div className="register">
                            <p>
                                Não tem conta? <a onClick={toCad}>Registre-se</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
