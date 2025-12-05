import { useState,useEffect } from "react";
import axios from 'axios';

interface CardData {
    nome: string
    localizacao: string
    setor: string
    anoTermo: string
    anoAlvo: string
}


const ListarEmpresas = () => {
    const [emps, setEmp] = useState([])
    const fetchApi = async () =>{
        const resp = await axios.get("/api/empresa/")
        setEmp(resp.data)
    } 
    useEffect(()=>{
        fetchApi()
    },[])


    return(
        <div className="d-flex justify-content-center">
            <div className="card" style={{width: "20rem"}}>
                <div className="card-body">
                    {emps.map((data,index)=>(
                        <div key={index}>

                        </div>
                    )}
                    <h2 className="card-title">
                        {data.nome}
                    </h2>
                    <h5>{data.localizacao}</h5>
                    <h5>{data.setor}</h5>
                    <h5>{data.anoTermo}</h5>
                    <h5>{data.anoAlvo}</h5>
                </div>
            </div>
        </div>
    )
}
export default ListarEmpresas