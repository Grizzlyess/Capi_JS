import React, { useRef, useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
    const ipEmail = useRef<HTMLInputElement | null>(null);
    const pass = useRef<HTMLInputElement | null>(null);
    const passck = useRef<HTMLInputElement | null>(null);
    const [err, setErr] = useState("");
    
    const handleSubb = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass.current?.value !== passck.current?.value) {
            setErr("As senhas não coincidem.");
            return;
        }
        setErr("");
        console.log("Senhas iguais");
    };

    return (
        <main className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.ico" alt="" />
            </div>
            <div className="cadastro p-3">
                <h4 className="mb-5">CAPI - Cadastro</h4>
                <form onSubmit={handleSubb} className="w-100">
                    <div className="form w-100 mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            ref={ipEmail}
                        />
                    </div>
                    <div className="form w-100 mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            ref={pass}
                        />
                    </div>
                    <div className="form w-100 mb-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirmar Senha"
                            ref={passck}
                        />
                        {err && <p style={{ color: "red" }}>{err}</p>}
                    </div>

                    <button type="submit" className="btn logcad w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
        </main>
    );
};
export default Cadastro;
