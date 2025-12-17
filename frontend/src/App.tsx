import HomePage from "./pages/HomePage";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListarEmpresas from "./pages/empresas/ListarEmpresas";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/cadastro",
        element: <Cadastro />,
    },
    {
        path: "/empresas",
        element: <ListarEmpresas />,
    },
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
