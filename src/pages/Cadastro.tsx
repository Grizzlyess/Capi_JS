import "./Cadastro.css"

const Cadastro = () =>{
    return(
        <main className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.ico" alt="" />
            </div>
            <div className="cadastro p-3">
                <h4 className="mb-5">CAPI - Cadastro</h4>
                
                <div className="form w-100 mb-3">
                    <input type="email" className="form-control" placeholder="Email"/>
                </div>
                <div className="form w-100 mb-3">
                    <input type="password" className="form-control" placeholder="Senha"/>
                </div>
                <div className="form w-100 mb-5">
                    <input type="password" className="form-control" placeholder="Confirmar Senha"/>
                    
                </div>

                <button type="submit" className="btn logcad w-100">Cadastrar</button>
                
            </div>
        </main>
    )
}
export default Cadastro