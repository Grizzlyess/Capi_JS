import { useState, useEffect } from "react";
import axios from "axios";
import "./ListarEmpresas.css"

interface Empresa {
    id: string;
    company_name: string;
    location?: string;
    sector?: string;
    near_term_status?: string;
    near_term_target_year?: string;
}
interface ApiResp {
    total: number;
    page: number;
    totalPages: number;
    data: Empresa[];
}
const ListarEmpresas = () => {
    const [emps, setemp] = useState<Empresa[]>([]);
    const fetchApi = async () => {
        const resp = await axios.get<ApiResp>("http://localhost:8080/empresa/?page=1");
        setemp(resp.data.data ?? []);
    };
    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <div className="main emps">
                {emps.map((emp) => (
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <div key={emp.id}>
                                <h2 className="card-title">{emp.company_name}</h2>
                                <h5>{emp.location}</h5>
                                <h5>{emp.sector}</h5>
                                <h5>{emp.near_term_status}</h5>
                                <h5>{emp.near_term_target_year}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default ListarEmpresas;
