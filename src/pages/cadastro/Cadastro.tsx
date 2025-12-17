import React, { useRef, useState } from "react";
import "./Cadastro.css";
import axios from "axios";

const Cadastro = () => {
    const ipName = useRef<HTMLInputElement | null>(null);
    const ipEmail = useRef<HTMLInputElement | null>(null);
    const pass = useRef<HTMLInputElement | null>(null);
    const passck = useRef<HTMLInputElement | null>(null);
    const [err, setErr] = useState("");
    
    const handleApi = async () =>{
        try {
            await axios.post("api/user/",{email:ipEmail.current?.value,name:ipName.current?.value,pass:pass.current?.value})
            //console.log("User Criado")
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubb = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass.current?.value !== passck.current?.value) {
            setErr("As senhas não coincidem.");
            return;
        }
        setErr("");
        //console.log("Prox");
        handleApi()
    };

    return (
        <div className="main d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="logo text-center mb-3">
                <img src="src/assets/capi.svg" alt="" />
            </div>
            <div className="cadastro p-3">
                <h3 className="mb-5">CAPI - Cadastro</h3>
                <form onSubmit={handleSubb} className="w-100">
                    <div className="form w-100 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            ref={ipName}
                            required
                        />
                    </div>
                    <div className="form w-100 mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            ref={ipEmail}
                            required
                        />
                    </div>
                    <div className="form w-100 mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            ref={pass}
                            required
                        />
                    </div>
                    <div className="form w-100 mb-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirmar Senha"
                            ref={passck}
                            required
                        />
                        {err && <p style={{ color: "red" }}>{err}</p>}
                    </div>

                    <button type="submit" className="btn logcad w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Cadastro;
