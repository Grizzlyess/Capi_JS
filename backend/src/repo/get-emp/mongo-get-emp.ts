import type { IGetEmpRepo } from "../../controllers/get-emp/protocols";
import type { Emp } from "../../models/emp";

export class MongoGetEmpRepo implements IGetEmpRepo {
  async getEmp(): Promise<Emp[]> {
    return [
      {
        id: "1",
        company_name: "teste",
        location: "brasil",
        sector: "eco",
        near_term_status: "2023",
        near_term_target_year: "2027",
      },
    ];
  }
}
