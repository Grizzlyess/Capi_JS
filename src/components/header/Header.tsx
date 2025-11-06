import "./Header.css"

const Header = () => {
    return (
        <header>
            <div className="container text-center">
                <div className="row">
                    <div className="col ratio">
                        <img src="src/assets/capi.svg" alt="logo-capi" />
                    </div>
                    <div className="col">
                        <nav>Sobre</nav>
                    </div>
                    <div className="col">
                        <button className="btn btn-success">login</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header