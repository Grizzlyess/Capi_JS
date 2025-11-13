import type { IGetEmpControl, IGetEmpRepo } from "./protocols";

export class GetEmpControl implements IGetEmpControl {
  constructor(private readonly getEmpRepo: IGetEmpRepo) {}
  async handle() {
    try {
      const emps = await this.getEmpRepo.getEmp();
      return {
        statusCode: 200,
        body: emps,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado.",
      };
    }
  }
}
