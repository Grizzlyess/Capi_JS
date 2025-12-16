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
                            <button className="btn btn-success">Login</button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="d-flex flex-column flex-fill">
                <div className="msg d-flex justify-content-center align-items-center">
                    <p>O que fazemos com o planeta hoje determinará o nosso amanhã.</p>
                </div>

                <div className="container text-center mb-3">
                    <div className="column">
                        <div className="col p-1">
                            <section className="ratio ratio-1x1">
                                <button>Listar Usuários</button>
                            </section>
                        </div>
                        <div className="col p-1">
                            <section className="ratio ratio-1x1">
                                <button>Atualizar Guia</button>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque doloremque consectetur necessitatibus vero, aliquam consequuntur voluptate vitae vel fugit recusandae dolor, asperiores aliquid dolore porro deserunt expedita obcaecati inventore reiciendis.</p>
            </footer>
        </div>
    )
}
export default Admin