import HomePage from "./pages/HomePage";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListarEmpresas from "./pages/empresas/ListarEmpresas";
import CalculadoraCarbono from "./pages/calculadora/CalculadoraCarbono";
import UsuarioLogado from "./pages/usuario_logado/UsuarioLogado";
import CalculadoraCarbonoMensagem from "./pages/calculadora/CalculadoraCarbonoMensagem";
import Admin from "./pages/admin/Admin";
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
    {
        path: "/calc",
        element: <CalculadoraCarbono />,
    },
    {
        path: "/calcm",
        element: <CalculadoraCarbonoMensagem />,
    },
    {
        path: "/perfil",
        element: <UsuarioLogado />,
    },
    {
        path: "/admin",
        element: <Admin />,
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
