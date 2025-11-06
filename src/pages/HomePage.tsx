import Header from "../components/header/Header"
import Main from "../components/main/Main"
import Footer from "../components/footer/Footer"

const HomePage = () =>{
    return(
        <div className="d-flex flex-column justify-content-between min-vh-100">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
export default HomePage