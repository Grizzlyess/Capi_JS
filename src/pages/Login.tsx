import "./Login.css"

const Login = () =>{
    return(
        <main className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-5">
                <img src="src/assets/capi.ico" alt="" />
            </div>
            <div className="login bg-primary p-4">
                <h3 className="mb-3">CAPI - Login</h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-5">
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                    </div>
                    <button type="submit" className="btn btn-info w-100">Login</button>
                </form>
            </div>
        </main>
    )
}
export default Login