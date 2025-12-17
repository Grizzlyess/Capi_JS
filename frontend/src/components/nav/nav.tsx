type NavegacaoProps = {
    titulo?: string
};

const Navegacao = ({titulo = "padrao"}:NavegacaoProps) => {
    return (
        <nav className="navbar justify-content-between mb-3 px-4">
            <a className="navbar-brand" href="">
                <img src="src/assets/arrow-left-solid-full.svg" alt="" width={35}/>
            </a>
            <h2 className="m-0">
                {titulo}
            </h2>
            <div className="btn-group">
                <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Conta
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a className="dropdown-item" href="#">
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
            
        </nav>
    );
};
export default Navegacao;