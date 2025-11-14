import "./Login.css";

const Login = () => {
  return (
    <main className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
      <div className="logo text-center mb-5">
        <img src="src/assets/capi.svg" alt="" />
      </div>
      <div className="login bg-primary p-4">
        <h3 className="mb-3">CAPI - Login</h3>
        <form>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" />
            <label className="form-label">Email address</label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            <label className="form-label">Password</label>
          </div>
          <button type="submit" className="btn btn-info w-100">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};
export default Login;
