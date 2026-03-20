import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./../../styles/pages/ResetPass.css";
import capiIcon from "@/assets/capi.svg";

const ResetPass = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPass = async () => {
        try {
            setErro("");
            setSucesso("");

            if (newPass !== confirmPass) {
                setErro("As senhas não coincidem.");
                return;
            }

            setLoading(true);

            await api.post("/user/reset-pass", {
                token,
                newPass
            });

            setSucesso("Senha alterada com sucesso!");
            setTimeout(() => navigate("/login"), 1200);
        } catch (err: any) {
            setErro(err?.response?.data?.error || "Erro ao redefinir senha.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resetPage d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="resetCard">
                <div className="resetLogo mb-3 text-center">
                    <img src={capiIcon} alt="CAPI" />
                </div>

                <h2 className="resetTitle mb-3 text-center">
                    Redefinir senha
                </h2>

                <p className="resetText text-center mb-4">
                    Digite o código recebido e sua nova senha.
                </p>

                <div className="formGroup mb-3">
                    <label>Código</label>
                    <input
                        type="text"
                        className="form-control"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>

                <div className="formGroup mb-3">
                    <label>Nova senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
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

                {erro && <p className="resetError">{erro}</p>}
                {sucesso && <p className="resetSuccess">{sucesso}</p>}

                <button
                    className="btnReset"
                    onClick={handleResetPass}
                    disabled={loading}
                >
                    {loading ? "Salvando..." : "Redefinir senha"}
                </button>

                <div className="resetBack mt-3 text-center">
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

export default ResetPass;