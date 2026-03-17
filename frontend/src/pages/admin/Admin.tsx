import axios from "axios"
import Navegacao from "../../components/nav"
import "./../../styles/pages/Admin.css"
import { useEffect, useState } from "react"

interface User {
    id: string
    name: string
    email: string
}

interface Empresa {
    id: string
    company_name: string
    location: string
    sector: string
    near_term_status: string
    near_term_target_year: number
}

interface EmpresaResponse {
    total: number
    page: number
    totalPages: number
    data: Empresa[]
}

interface Mensagem {
    id: string
    texto: string
    nivel: string
    min: number
    max: number
}

const Admin = () => {
    const [users, setUsers] = useState<User[]>([])
    const [empresas, setEmpresas] = useState<Empresa[]>([])
    const [mensagensCalc, setMensagensCalc] = useState<Mensagem[]>([])

    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingEmpresas, setLoadingEmpresas] = useState(false)
    const [loadingMensagens, setLoadingMensagens] = useState(false)

    const [mensagem, setMensagem] = useState("")

    const [empresaForm, setEmpresaForm] = useState({
        id: "",
        company_name: "",
        location: "",
        sector: "",
        near_term_status: "",
        near_term_target_year: ""
    })

    const [adminEmail, setAdminEmail] = useState("")

    const [mensagemForm, setMensagemForm] = useState({
        id: "",
        texto: "",
        nivel: "",
        min: "",
        max: ""
    })

    const [aba, setAba] = useState<"usuarios" | "empresas" | "admins" | "mensagens">("usuarios")

    const limparMensagemDepois = () => {
        setTimeout(() => setMensagem(""), 3000)
    }

    const fetchUsers = async () => {
        try {
            setLoadingUsers(true)
            const resp = await axios.get<User[]>("/api/user")
            setUsers(resp.data)
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao buscar usuários.")
            limparMensagemDepois()
        } finally {
            setLoadingUsers(false)
        }
    }

    const fetchEmpresas = async () => {
        try {
            setLoadingEmpresas(true)
            const resp = await axios.get<EmpresaResponse>("/api/empresa?page=1")
            setEmpresas(resp.data.data)
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao buscar empresas.")
            limparMensagemDepois()
        } finally {
            setLoadingEmpresas(false)
        }
    }

    const fetchMensagens = async () => {
        try {
            setLoadingMensagens(true)
            const resp = await axios.get<Mensagem[]>("/api/mensagem")
            setMensagensCalc(resp.data)
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao buscar mensagens da calculadora.")
            limparMensagemDepois()
        } finally {
            setLoadingMensagens(false)
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchEmpresas()
        fetchMensagens()
    }, [])

    const deleteUser = async (id: string) => {
        try {
            await axios.delete(`/api/user/${id}`)
            setMensagem("Usuário removido com sucesso.")
            fetchUsers()
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao remover usuário.")
        } finally {
            limparMensagemDepois()
        }
    }

    const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEmpresaForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const salvarEmpresa = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const payload = {
                company_name: empresaForm.company_name,
                location: empresaForm.location,
                sector: empresaForm.sector,
                near_term_status: empresaForm.near_term_status,
                near_term_target_year: Number(empresaForm.near_term_target_year)
            }

            if (empresaForm.id) {
                await axios.put(`/api/empresa/${empresaForm.id}`, payload)
                setMensagem("Empresa atualizada com sucesso.")
            } else {
                await axios.post("/api/empresa", payload)
                setMensagem("Empresa cadastrada com sucesso.")
            }

            setEmpresaForm({
                id: "",
                company_name: "",
                location: "",
                sector: "",
                near_term_status: "",
                near_term_target_year: ""
            })

            fetchEmpresas()
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao salvar empresa.")
        } finally {
            limparMensagemDepois()
        }
    }

    const editarEmpresa = (empresa: Empresa) => {
        setEmpresaForm({
            id: empresa.id,
            company_name: empresa.company_name,
            location: empresa.location,
            sector: empresa.sector,
            near_term_status: empresa.near_term_status,
            near_term_target_year: String(empresa.near_term_target_year)
        })
        setAba("empresas")
    }

    const deletarEmpresa = async (id: string) => {
        try {
            await axios.delete(`/api/empresa/${id}`)
            setMensagem("Empresa deletada com sucesso.")
            fetchEmpresas()
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao deletar empresa.")
        } finally {
            limparMensagemDepois()
        }
    }

    const promoverAdmin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.patch("/api/user/promote-admin", { email: adminEmail })
            setMensagem("Administrador adicionado com sucesso.")
            setAdminEmail("")
        } catch (error) {
            console.error(error)
            setMensagem("Crie a rota de promoção de admin no backend.")
        } finally {
            limparMensagemDepois()
        }
    }

    const handleMensagemChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setMensagemForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const salvarMensagem = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const payload = {
                texto: mensagemForm.texto,
                nivel: mensagemForm.nivel,
                min: Number(mensagemForm.min),
                max: Number(mensagemForm.max)
            }

            if (mensagemForm.id) {
                await axios.put(`/api/mensagem/${mensagemForm.id}`, payload)
                setMensagem("Mensagem atualizada com sucesso.")
            } else {
                await axios.post("/api/mensagem", payload)
                setMensagem("Mensagem criada com sucesso.")
            }

            setMensagemForm({
                id: "",
                texto: "",
                nivel: "",
                min: "",
                max: ""
            })

            fetchMensagens()
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao salvar mensagem.")
        } finally {
            limparMensagemDepois()
        }
    }

    const editarMensagem = (msg: Mensagem) => {
        setMensagemForm({
            id: msg.id,
            texto: msg.texto,
            nivel: msg.nivel,
            min: String(msg.min),
            max: String(msg.max)
        })
        setAba("mensagens")
    }

    const deletarMensagem = async (id: string) => {
        try {
            await axios.delete(`/api/mensagem/${id}`)
            setMensagem("Mensagem removida com sucesso.")
            fetchMensagens()
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao remover mensagem.")
        } finally {
            limparMensagemDepois()
        }
    }

    return (
        <div className="Adm">
            <Navegacao titulo="Administrador" />

            <main className="admin-main">
                <div className="admin-panel">
                    <h1>Painel Administrativo</h1>

                    {mensagem && <p className="admin-msg">{mensagem}</p>}

                    <div className="admin-tabs">
                        <button onClick={() => setAba("usuarios")}>Usuários</button>
                        <button onClick={() => setAba("empresas")}>Empresas</button>
                        <button onClick={() => setAba("admins")}>Administradores</button>
                        <button onClick={() => setAba("mensagens")}>Mensagens</button>
                    </div>

                    {aba === "usuarios" && (
                        <section className="admin-section">
                            <h2>Gestão de Usuários</h2>

                            {loadingUsers ? (
                                <p>Carregando usuários...</p>
                            ) : users.length === 0 ? (
                                <p>Nenhum usuário encontrado.</p>
                            ) : (
                                <div className="admin-list">
                                    {users.map((user) => (
                                        <div className="admin-card" key={user.id}>
                                            <div>
                                                <p><strong>Nome:</strong> {user.name}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                            </div>

                                            <button
                                                className="btn-danger"
                                                onClick={() => deleteUser(user.id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {aba === "empresas" && (
                        <section className="admin-section">
                            <h2>Gestão de Empresas</h2>

                            <form className="admin-form" onSubmit={salvarEmpresa}>
                                <input
                                    type="text"
                                    name="company_name"
                                    placeholder="Nome da empresa"
                                    value={empresaForm.company_name}
                                    onChange={handleEmpresaChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Localização"
                                    value={empresaForm.location}
                                    onChange={handleEmpresaChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="sector"
                                    placeholder="Setor"
                                    value={empresaForm.sector}
                                    onChange={handleEmpresaChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="near_term_status"
                                    placeholder="Status"
                                    value={empresaForm.near_term_status}
                                    onChange={handleEmpresaChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="near_term_target_year"
                                    placeholder="Ano meta"
                                    value={empresaForm.near_term_target_year}
                                    onChange={handleEmpresaChange}
                                    required
                                />

                                <button type="submit">
                                    {empresaForm.id ? "Atualizar Empresa" : "Cadastrar Empresa"}
                                </button>
                            </form>

                            {loadingEmpresas ? (
                                <p>Carregando empresas...</p>
                            ) : empresas.length === 0 ? (
                                <p>Nenhuma empresa encontrada.</p>
                            ) : (
                                <div className="admin-list">
                                    {empresas.map((empresa) => (
                                        <div className="admin-card" key={empresa.id}>
                                            <div>
                                                <p><strong>Nome:</strong> {empresa.company_name}</p>
                                                <p><strong>Local:</strong> {empresa.location}</p>
                                                <p><strong>Setor:</strong> {empresa.sector}</p>
                                                <p><strong>Status:</strong> {empresa.near_term_status}</p>
                                                <p><strong>Ano:</strong> {empresa.near_term_target_year}</p>
                                            </div>

                                            <div className="admin-actions">
                                                <button type="button" onClick={() => editarEmpresa(empresa)}>
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-danger"
                                                    onClick={() => deletarEmpresa(empresa.id)}
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {aba === "admins" && (
                        <section className="admin-section">
                            <h2>Adicionar Administrador</h2>

                            <form className="admin-form" onSubmit={promoverAdmin}>
                                <input
                                    type="email"
                                    placeholder="Email do usuário"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    required
                                />
                                <button type="submit">Promover para Admin</button>
                            </form>
                        </section>
                    )}

                    {aba === "mensagens" && (
                        <section className="admin-section">
                            <h2>Mensagens da Calculadora</h2>

                            <form className="admin-form" onSubmit={salvarMensagem}>
                                <textarea
                                    name="texto"
                                    placeholder="Texto da mensagem"
                                    value={mensagemForm.texto}
                                    onChange={handleMensagemChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="nivel"
                                    placeholder="Nível"
                                    value={mensagemForm.nivel}
                                    onChange={handleMensagemChange}
                                    required
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    name="min"
                                    placeholder="Valor mínimo"
                                    value={mensagemForm.min}
                                    onChange={handleMensagemChange}
                                    required
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    name="max"
                                    placeholder="Valor máximo"
                                    value={mensagemForm.max}
                                    onChange={handleMensagemChange}
                                    required
                                />

                                <button type="submit">
                                    {mensagemForm.id ? "Atualizar Mensagem" : "Criar Mensagem"}
                                </button>
                            </form>

                            {loadingMensagens ? (
                                <p>Carregando mensagens...</p>
                            ) : mensagensCalc.length === 0 ? (
                                <p>Nenhuma mensagem cadastrada.</p>
                            ) : (
                                <div className="admin-list">
                                    {mensagensCalc.map((msg) => (
                                        <div className="admin-card" key={msg.id}>
                                            <div>
                                                <p><strong>Nível:</strong> {msg.nivel}</p>
                                                <p><strong>Faixa:</strong> {msg.min} até {msg.max}</p>
                                                <p><strong>Texto:</strong> {msg.texto}</p>
                                            </div>

                                            <div className="admin-actions">
                                                <button type="button" onClick={() => editarMensagem(msg)}>
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-danger"
                                                    onClick={() => deletarMensagem(msg.id)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Admin