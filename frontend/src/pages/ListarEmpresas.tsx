import { useState, useEffect } from "react";
import axios from "axios";

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
            <div className="main d-flex justify-content-center" style={{ flexDirection: "column" }}>
                {emps.map((emp) => (
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <div key={emp.id}>
                                <p>{emp.company_name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default ListarEmpresas;
