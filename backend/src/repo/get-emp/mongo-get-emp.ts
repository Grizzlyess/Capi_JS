import { IGetEmpRepo } from "../../controllers/get-emp/protocols";
import { Emp } from "../../models/emp";
import { PrismaClient } from "@prisma/client";

export class MongoGetEmpRepo implements IGetEmpRepo {
  async getEmp(): Promise<Emp[]> {
    const prisma = new PrismaClient()
    return await prisma.empresa.findMany()
  }
}
