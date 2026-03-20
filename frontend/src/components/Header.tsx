import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css"
import capiIcon from "@/assets/capi.svg"

const Header = () => {
  const navigate = useNavigate()
  function OnLoginClick(){
    navigate("/login")
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <img src={capiIcon} id="logo" alt="logo-capi" />

            <nav>CAPI</nav>

            <button onClick={OnLoginClick}className="btn btn-success">Login</button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
