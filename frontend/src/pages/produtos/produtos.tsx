import { useMemo, useState } from "react";
import api from "../../services/api";
import "./../../styles/pages/Produtos.css";
import Navegacao from "../../components/nav";

interface Produto {
    codigo_de_barras: string;
    nome: string;
    imagem: string | null;
    ecoscore: string;
}

const sugestoes = ["Arroz", "Leite", "Feijão", "Macarrão", "Suco"];

const getEcoTexto = (ecoscore: string) => {
    switch (ecoscore?.toUpperCase()) {
        case "A":
            return "Impacto ambiental muito baixo";
        case "B":
            return "Impacto ambiental baixo";
        case "C":
            return "Impacto ambiental moderado";
        case "D":
            return "Impacto ambiental alto";
        case "E":
            return "Impacto ambiental muito alto";
        default:
            return "Não avaliado";
    }
};

const getEcoClasse = (ecoscore: string) => {
    switch (ecoscore?.toUpperCase()) {
        case "A":
            return "eco-a";
        case "B":
            return "eco-b";
        case "C":
            return "eco-c";
        case "D":
            return "eco-d";
        case "E":
            return "eco-e";
        default:
            return "eco-na";
    }
};

const ListarProdutos = () => {
    const [busca, setBusca] = useState("");
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const sugestoesFiltradas = sugestoes.filter((item) =>
        item.toLowerCase().includes(busca.toLowerCase())
    );

    const fetchProdutos = async (termo: string) => {
        const termoLimpo = termo.trim();

        if (!termoLimpo) {
            setProdutos([]);
            return;
        }

        try {
            setLoading(true);
            setErro("");

            const resp = await api.get<Produto[]>(
                `/produtos/nome/${encodeURIComponent(termoLimpo)}`
            );

            setProdutos(resp.data ?? []);
        } catch (error) {
            console.error(error);
            setProdutos([]);
            setErro("Erro ao buscar produtos.");
        } finally {
            setLoading(false);
        }
    };

    const produtosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        if (!termo) return produtos;

        return produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(termo) ||
            produto.codigo_de_barras.toLowerCase().includes(termo) ||
            produto.ecoscore.toLowerCase().includes(termo)
        );
    }, [produtos, busca]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!busca.trim()) return;
        await fetchProdutos(busca);
        setMostrarSugestoes(false);
    };

    return (
        <div className="main emps">
            <Navegacao titulo="Produtos" />

            <section className="catalogo-wrapper-produtos">
                <div className="catalogo-topo">
                    <h1 className="catalogo-titulo">Catálogo de Produtos</h1>

                    <form className="catalogo-busca-form" onSubmit={handleSubmit}>
                        <div className="busca-wrapper">
                            <input
                                type="text"
                                className="catalogo-busca"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                onFocus={() => setMostrarSugestoes(true)}
                                onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
                                placeholder="Buscar produto..."
                            />

                            {mostrarSugestoes && (
                                <div className="sugestoes-box">
                                    {sugestoesFiltradas.length > 0 ? (
                                        sugestoesFiltradas.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className="sugestao-item"
                                                onClick={async () => {
                                                    setBusca(item);
                                                    setMostrarSugestoes(false);
                                                    await fetchProdutos(item);
                                                }}
                                            >
                                                {item}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="sem-sugestao">Nenhuma sugestão</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="catalogo-busca-btn">
                            Buscar
                        </button>
                    </form>
                </div>

                {erro && <p className="catalogo-erro">{erro}</p>}

                {loading ? (
                    <p className="catalogo-info">Carregando produtos...</p>
                ) : produtos.length === 0 ? (
                    <p className="catalogo-info">Pesquise um produto para começar.</p>
                ) : produtosFiltrados.length === 0 ? (
                    <p className="catalogo-info">Nenhum produto encontrado.</p>
                ) : (
                    <div className="catalogo-grid">
                        {produtosFiltrados.map((produto) => (
                            <article className="cardEmp cardProduto" key={produto.codigo_de_barras}>
                                <div className="cardProduto-img-wrapper">
                                    {produto.imagem ? (
                                        <img
                                            src={produto.imagem}
                                            alt={produto.nome}
                                            className="cardProduto-img"
                                        />
                                    ) : (
                                        <div className="cardProduto-sem-img">
                                            Sem imagem
                                        </div>
                                    )}
                                </div>

                                <h2 className="cardEmp-title">{produto.nome}</h2>

                                <div className="cardEmp-content">
                                    <p>
                                        <strong>Código:</strong> {produto.codigo_de_barras}
                                    </p>

                                    <p>
                                        <strong>Ecoscore:</strong>{" "}
                                        <span className={`eco-badge ${getEcoClasse(produto.ecoscore)}`}>
                                            {produto.ecoscore || "Não avaliado"}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Impacto:</strong> {getEcoTexto(produto.ecoscore)}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ListarProdutos;