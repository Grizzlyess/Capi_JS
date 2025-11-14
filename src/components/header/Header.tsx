import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate()
  function OnLoginClick(){
    navigate("/login")
  }
  return (
    <header>
      <div className="container text-center align-items-center">
        <div className="row">
          <div className="col ratio">
            <img src="src/assets/capi.svg" id="logo" alt="logo-capi" />
          </div>
          <div className="col">
            <nav>Sobre</nav>
          </div>
          <div className="col">
            <button onClick={OnLoginClick}className="btn btn-success">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
