import "./Admin.css"

const Admin = () =>{
    return(
        <div className="d-flex flex-column justify-content-between min-vh-100">
            <header>
                <div className="container text-center align-items-center">
                    <div className="row">
                        <div className="col ratio">
                            <img src="src/assets/capi.svg" id="logo" alt="logo-capi" />
                        </div>
                        <div className="col">
                            <nav>Administrador</nav>
                        </div>
                        <div className="col">
                            <button className="btn btn-success">Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-fill d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column gap-4">
                        <button className="btn btn-lg botao">Listar Usuários</button>
                        <button className="btn btn-lg botao">Atualizar Guia</button>
                </div>
            </main>
            <footer>
                <p className="justify-content-center">©Capi. Created by: A Ordem, 2025.</p>
            </footer>
        </div>
    )
}
export default Admin