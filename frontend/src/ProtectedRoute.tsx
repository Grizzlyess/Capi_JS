import { Navigate } from "react-router-dom";
import { useSession } from "./hooks/useSession";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useSession();

    if (loading) return <p>Carregando...</p>;

    if (!user) return <Navigate to="/login" />;

    return <>{children}</>;
};

export default ProtectedRoute;