import Navegacao from "../../components/nav/nav"
import Footer from "../../components/footer/Footer"
import "./Admin.css"

const Admin = () =>{
    return(
        <>
        <Navegacao titulo="Administrador"/>
        <div className="d-flex flex-column justify-content-between min-vh-100">
            
            <main className="flex-fill d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column gap-4">
                        <button className="btn btn-lg botao">Listar Usuários</button>
                        <button className="btn btn-lg botao">Atualizar Guia</button>
                </div>
            </main>
            <Footer/>
        </div>
        </>
    )
}
export default Admin