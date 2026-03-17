import { Outlet } from "react-router-dom";


const DefaultLayout = () => {
    return (
        <div className="defaultLayout d-flex flex-column min-vh-100">

            <main className="layoutMain flex-grow-1">
                <Outlet />
            </main>

            <footer className="layoutFooter">
                ©Capi. Created by: A Ordem, 2026.
            </footer>
        </div>
    );
};

export default DefaultLayout;