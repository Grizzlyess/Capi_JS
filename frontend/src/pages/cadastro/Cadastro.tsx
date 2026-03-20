import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./../../styles/pages/Cadastro.css";
import capiIcon from "@/assets/capi.svg";

const Cadastro = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const validar = () => {
        if (!name || !email || !pass || !confirmPass) {
            return "Preencha todos os campos.";
        }

        if (name.trim().length < 4) {
            return "Nome deve ter pelo menos 4 caracteres.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Email inválido.";
        }

        if (pass.length < 4) {
            return "Senha muito curta.";
        }

        if (pass !== confirmPass) {
            return "As senhas não coincidem.";
        }

        return null;
    };

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();

        const erro = validar();
        if (erro) {
            setMsg(erro);
            return;
        }

        try {
            setLoading(true);
            setMsg("");

            await api.post("/user", {
                name,
                email,
                pass,
            });

            setMsg("Conta criada com sucesso!");

            setTimeout(() => navigate("/login"), 1200);
        } catch {
            setMsg("Erro ao criar conta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cadastroPage d-flex flex-column min-vh-100 justify-content-center align-items-center">

            <form className="cadastroCard" onSubmit={handleCadastro}>

                <div className="cadastroLogo text-center mb-3">
                    <img src={capiIcon} alt="CAPI" />
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
                        required
                        minLength={4}
                    />
                </div>

                <div className="formGroup mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="formGroup mb-3">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                        minLength={4}
                    />
                </div>

                <div className="formGroup mb-4">
                    <label>Confirmar senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                        minLength={4}
                    />
                </div>

                {msg && <p className="cadastroMsg">{msg}</p>}

                <button
                    type="submit"
                    className="btnCadastro"
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>

                <div className="cadastroLogin text-center mt-3">
                    <span>Já tem conta?</span>
                    <button
                        type="button"
                        className="linkBtn"
                        onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Cadastro;