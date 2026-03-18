import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./../../styles/pages/ListarEmpresas.css";
import Navegacao from "../../components/nav";
import { useSession } from "../../hooks/useSession";

interface Empresa {
    id: string;
    company_name: string;
    location?: string;
    sector?: string;
    near_term_status?: string;
    near_term_target_year?: string | number;
}

interface ApiResp {
    total: number;
    page: number;
    totalPages: number;
    data: Empresa[];
}

const ListarEmpresas = () => {
    const { user } = useSession();

    const [emps, setEmp] = useState<Empresa[]>([]);
    const [favoritos, setFavoritos] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const fetchEmpresas = async (currentPage = 1) => {
        try {
            setLoading(true);
            setErro("");

            const resp = await axios.get<ApiResp>(`/api/empresa?page=${currentPage}`);
            setEmp(resp.data.data ?? []);
            setPage(resp.data.page ?? 1);
            setTotalPages(resp.data.totalPages ?? 1);
        } catch (error) {
            console.error(error);
            setErro("Erro ao buscar empresas.");
        } finally {
            setLoading(false);
        }
    };

    const fetchFavoritos = async () => {
        if (!user) return;

        try {
            const resp = await axios.get<Empresa[]>(`/api/user/${user.id}/favoritos`);
            setFavoritos((resp.data ?? []).map((emp) => emp.id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmpresas(1);
    }, []);

    useEffect(() => {
        fetchFavoritos();
    }, [user]);

    const toggleFavorito = async (empresaId: string) => {
        if (!user) {
            setErro("Você precisa estar logado para favoritar.");
            return;
        }

        const jaEhFavorita = favoritos.includes(empresaId);

        try {
            if (jaEhFavorita) {
                await axios.delete(`/api/user/${user.id}/favoritos/${empresaId}`);
                setFavoritos((prev) => prev.filter((id) => id !== empresaId));
            } else {
                await axios.patch(`/api/user/${user.id}/favoritos/${empresaId}`);
                setFavoritos((prev) => [...prev, empresaId]);
            }
        } catch (error) {
            console.error(error);
            setErro("Erro ao atualizar favoritos.");
        }
    };

    const empresasFiltradas = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        if (!termo) return emps;

        return emps.filter((emp) =>
            emp.company_name.toLowerCase().includes(termo) ||
            (emp.location ?? "").toLowerCase().includes(termo) ||
            (emp.sector ?? "").toLowerCase().includes(termo)
        );
    }, [emps, busca]);

    return (
        <div className="main emps">
            <Navegacao titulo="Empresas" />

            <section className="catalogo-wrapper">
                <div className="catalogo-topo">
                    <h1 className="catalogo-titulo">Catálogo de Empresas</h1>

                    <input
                        type="text"
                        className="catalogo-busca"
                        placeholder="Buscar por nome, país ou setor..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>

                {erro && <p className="catalogo-erro">{erro}</p>}

                {loading ? (
                    <p className="catalogo-info">Carregando empresas...</p>
                ) : empresasFiltradas.length === 0 ? (
                    <p className="catalogo-info">Nenhuma empresa encontrada.</p>
                ) : (
                    <div className="catalogo-grid">
                        {empresasFiltradas.map((emp) => {
                            const favorita = favoritos.includes(emp.id);

                            return (
                                <article className="cardEmp" key={emp.id}>
                                    <div className="cardEmp-header">
                                        <h2 className="cardEmp-title">{emp.company_name}</h2>

                                        <button
                                            type="button"
                                            className={`favorito-btn ${favorita ? "ativo" : ""}`}
                                            onClick={() => toggleFavorito(emp.id)}
                                        >
                                            {favorita ? "★" : "☆"}
                                        </button>
                                    </div>

                                    <div className="cardEmp-content">
                                        <p><strong>País:</strong> {emp.location || "Não informado"}</p>
                                        <p><strong>Setor:</strong> {emp.sector || "Não informado"}</p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {emp.near_term_status || "Não informado"}
                                        </p>
                                        <p>
                                            <strong>Meta:</strong>{" "}
                                            {emp.near_term_target_year || "Não informado"}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {!busca.trim() && totalPages > 1 && (
                    <div className="catalogo-paginacao">
                        <button
                            type="button"
                            disabled={page <= 1}
                            onClick={() => fetchEmpresas(page - 1)}
                        >
                            Anterior
                        </button>

                        <span>
                            Página {page} de {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => fetchEmpresas(page + 1)}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ListarEmpresas;