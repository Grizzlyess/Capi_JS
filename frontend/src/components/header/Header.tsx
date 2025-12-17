import { useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const navigate = useNavigate()
  function OnLoginClick(){
    navigate("/login")
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <img src="src/assets/capi.svg" id="logo" alt="logo-capi" />

            <nav>CAPI</nav>

            <button onClick={OnLoginClick}className="btn btn-success">Login</button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
