// src/pages/user/Cadastro.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./../../styles/pages/Cadastro.css";

const Cadastro = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [msg, setMsg] = useState("");

    const handleCadastro = async () => {
        if (pass !== confirmPass) {
            setMsg("As senhas não coincidem.");
            return;
        }

        try {
            await api.post("/user", {
                name: name,
                email: email,
                pass: pass,
            });

            setMsg("Conta criada com sucesso!");
            setTimeout(() => navigate("/login"), 1200);

        } catch {
            setMsg("Erro ao criar conta.");
        }
    };

    return (
        <div className="cadastroPage d-flex flex-column min-vh-100 justify-content-center align-items-center">

            <div className="cadastroCard">

                <div className="cadastroLogo text-center mb-3">
                    <img src="src/assets/capi.svg" alt="CAPI" />
                </div>

                <h2 className="cadastroTitle text-center mb-4">
                    CAPI - Cadastro
                </h2>

                <div className="formGroup mb-3">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="formGroup mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="formGroup mb-3">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                <div className="formGroup mb-4">
                    <label>Confirmar senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>

                {msg && (
                    <p className="cadastroMsg">
                        {msg}
                    </p>
                )}

                <button
                    className="btnCadastro"
                    onClick={handleCadastro}
                >
                    Cadastrar
                </button>

                <div className="cadastroLogin text-center mt-3">
                    <span>Já tem conta?</span>
                    <button
                        className="linkBtn"
                        onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Cadastro;