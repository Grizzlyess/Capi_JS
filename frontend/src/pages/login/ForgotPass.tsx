import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./../../styles/pages/ForgotPass.css";
import capiIcon from "@/assets/capi.svg";

const ForgotPass = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        try {
            setErro("");
            setSucesso("");
            setLoading(true);

            await api.post("/user/forgot-pass", { email });

            setSucesso("Código enviado para seu email.");
            setTimeout(() => navigate("/resetPass"), 1200);
        } catch (err: any) {
            setErro(err?.response?.data?.error || "Erro ao enviar código.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgotPage d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="forgotCard">
                <div className="forgotLogo mb-3 text-center">
                    <img src={capiIcon} alt="CAPI" />
                </div>

                <h2 className="forgotTitle mb-3 text-center">
                    Esqueci minha senha
                </h2>

                <p className="forgotText text-center mb-4">
                    Informe seu email para receber o código de recuperação.
                </p>

                <div className="formGroup mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {erro && <p className="forgotError">{erro}</p>}
                {sucesso && <p className="forgotSuccess">{sucesso}</p>}

                <button
                    className="btnForgot"
                    onClick={handleSendCode}
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar código"}
                </button>

                <div className="forgotBack mt-3 text-center">
                    <button
                        className="linkBtn"
                        onClick={() => navigate("/login")}
                    >
                        Voltar para login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;