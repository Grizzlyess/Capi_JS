import "./Cadastro.css"

const Cadastro = () =>{
    return(
        <main className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.ico" alt="" />
            </div>
            <div className="cadastro p-3">
                <h4 className="mb-5">CAPI - Cadastro</h4>
                
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="Email"/>
                    <label htmlFor="floatingInput">Endereço de Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"/>
                    <label htmlFor="floatingPassword" className="form-label">Senha</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirmar Senha"/>
                    <label htmlFor="floatingConfirmPassword" className="form-label">Confirmar Senha</label>
                </div>

                <button type="submit" className="btn btn-info w-100">Cadastrar</button>
                
            </div>
        </main>
    )
}
export default Cadastro