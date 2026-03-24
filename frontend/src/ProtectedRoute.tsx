import { Navigate } from "react-router-dom";
import { useSession } from "./hooks/useSession";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useSession();

    if (loading) return <div className="text-center mt-5">Carregando...</div>;

    if (!user) return <Navigate to="/login" />;

    return <>{children}</>;
};

export default ProtectedRoute;