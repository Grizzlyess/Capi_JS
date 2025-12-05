import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate()
    function OnLoginClick(){
        navigate("/cadastro")
    }
    return (
        <div className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center">
                <img src="src/assets/capi.svg" alt="" />
            </div>
            <div className="login p-3">
                <h3 className="mb-5">CAPI - Login</h3>
                <div className="forms">
                    <div className="form mb-4">
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form mb-5">
                        <input type="password" className="form-control" placeholder="Senha" />
                    </div>
                    <button type="submit" className="btn logcad w-100 mb-3 mt-4">
                        Login
                    </button>
                    <div className="register">
                        <p>
                            Não tem conta? <a onClick={OnLoginClick}>Registre-se</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
