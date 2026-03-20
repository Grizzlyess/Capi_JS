import HomePage from "./pages/HomePage";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListarEmpresas from "./pages/empresas/ListarEmpresas";
import CalculadoraCarbono from "./pages/calculadora/CalculadoraCarbono";
import UsuarioLogado from "./pages/usuario_logado/UsuarioLogado";
import CalculadoraCarbonoMensagem from "./pages/calculadora/CalculadoraCarbonoMensagem";
import Admin from "./pages/admin/Admin";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import Produtos from "./pages/produtos/produtos";
import UserConf from "./pages/userConf/userConf";
import ForgotPass from "./pages/login/ForgotPass";
import ResetPass from "./pages/login/ResetPass";
import ProtectedRoute from "./ProtectedRoute";


const router = createHashRouter([
    {
        element: <DefaultLayout />,
        children: [

            {
                path: "/",
                element: <ProtectedRoute><HomePage /></ProtectedRoute>,
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
                element: <ProtectedRoute><ListarEmpresas /></ProtectedRoute>,
            },
            {
                path: "/calc",
                element: <ProtectedRoute><CalculadoraCarbono /></ProtectedRoute>,
            },
            {
                path: "/calcm",
                element: <ProtectedRoute><CalculadoraCarbonoMensagem /></ProtectedRoute>,
            },
            {
                path: "/perfil",
                element: <ProtectedRoute><UsuarioLogado /></ProtectedRoute>,
            },
            {
                path: "/perfilConf",
                element: <ProtectedRoute><UserConf /></ProtectedRoute>,
            },
            {
                path: "/forgotPass",
                element: <ForgotPass />
            },
            {
                path: "/resetPass",
                element: <ResetPass />
            },
            {
                path: "/admin",
                element: <ProtectedRoute><Admin /></ProtectedRoute>,
            },
            {
                path: "/produtos",
                element: <ProtectedRoute><Produtos /></ProtectedRoute>,
            },
        ],
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
