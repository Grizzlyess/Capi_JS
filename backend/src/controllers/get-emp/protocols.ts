import type { Emp } from "../../models/emp.ts";
import type { HttpResponse } from "../protocols";

export interface IGetEmpControl {
  handle(): Promise<HttpResponse<Emp[]>>;
}
export interface IGetEmpRepo {
  getEmp(): Promise<Emp[]>;
}
