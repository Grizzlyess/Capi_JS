import "./Login.css";

const Login = () => {
    return (
        <div className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-5">
                <img src="src/assets/capi.svg" alt="" />
            </div>
            <div className="login p-4">
                <h3 className="mb-5">CAPI - Login</h3>
                <div className="forms">
                    <div className="form mb-4">
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form mb-5">
                        <input type="password" className="form-control" placeholder="Senha" />
                    </div>
                    <button type="submit" className="btn btn-info w-100 mb-3">
                        Login
                    </button>
                    <div className="register">
                        <p>
                            Não tem conta? <a href="#">Registre-se</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
