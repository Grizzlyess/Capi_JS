import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import { useSession } from "../hooks/useSession";
import { Navigate } from "react-router-dom";

const HomePage = () => {
    const { user, loading} = useSession();
    if (loading) return <p>Carregando... </p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="d-flex flex-column justify-content-between min-vh-100">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
export default HomePage;
