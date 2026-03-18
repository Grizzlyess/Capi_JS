import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Navegacao from "../../components/nav";
import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import "./../../styles/pages/UserConf.css";

const UserConf = () => {
    const navigate = useNavigate();
    const { user, logout, loading } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    if (loading) {
        return (
            <div className="configPerfilPage d-flex flex-column min-vh-100">
                <Navegacao titulo="Configurar Perfil" />
                <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                    <div className="configPerfilCard">
                        <h2 className="configPerfilTitle mb-4 text-center">
                            Carregando...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" />;

    const handleUpdate = async () => {
        try {
            setErro("");
            setSucesso("");

            if (!name.trim() || !email.trim()) {
                setErro("Nome e email são obrigatórios.");
                return;
            }

            if (pass && pass.length < 6) {
                setErro("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            if (pass && pass !== confirmPass) {
                setErro("As senhas não coincidem.");
                return;
            }

            setSending(true);

            const body: { name: string; email: string; pass?: string } = {
                name: name.trim(),
                email: email.trim(),
            };

            if (pass.trim()) {
                body.pass = pass;
            }

            await api.put(`/user/${user.id}`, body);

            setSucesso("Dados atualizados com sucesso.");
            setPass("");
            setConfirmPass("");

            setTimeout(() => {
                navigate("/perfil");
            }, 1200);
        } catch (error: any) {
            const msg =
                error?.response?.data?.error || "Não foi possível atualizar os dados.";
            setErro(msg);
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
        );

        if (!confirmar) return;

        try {
            setErro("");
            setSucesso("");
            setSending(true);

            await api.delete(`/user/${user.id}`);
            await logout();

            navigate("/login");
        } catch (error: any) {
            const msg =
                error?.response?.data?.error || "Não foi possível deletar a conta.";
            setErro(msg);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="configPerfilPage d-flex flex-column min-vh-100">
            <Navegacao titulo="Configurar Perfil" />

            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="configPerfilCard">
                    <h2 className="configPerfilTitle mb-4 text-center">
                        Editar Perfil
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
                        <label>Nova senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Deixe vazio para não alterar"
                        />
                    </div>

                    <div className="formGroup mb-4">
                        <label>Confirmar nova senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            placeholder="Repita a nova senha"
                        />
                    </div>

                    {erro && <p className="configError">{erro}</p>}
                    {sucesso && <p className="configSuccess">{sucesso}</p>}

                    <button
                        className="btnSalvar mb-3"
                        onClick={handleUpdate}
                        disabled={sending}
                    >
                        {sending ? "Salvando..." : "Salvar alterações"}
                    </button>

                    <button
                        className="btnExcluir"
                        onClick={handleDelete}
                        disabled={sending}
                    >
                        {sending ? "Processando..." : "Deletar conta"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserConf;