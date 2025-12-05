import "./Login.css"

const Login = () =>{
    return(
        <main className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.ico" alt="" />
            </div>
            <div className="login p-3">
                <h4 className="mb-5">CAPI - Login</h4>
                
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="email"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-5">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword" className="form-label">Password</label>
                </div>

                <button type="submit" className="btn btn-info w-100">Login</button>
                
            </div>
        </main>
    )
}
export default Login