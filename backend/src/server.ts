//Backend modulos
import express from "express";
import cors from "cors";
import { GetEmpControl } from "./controllers/get-emp/get-emp";
import { MongoGetEmpRepo } from "./repo/get-emp/mongo-get-emp";

const app = express();
app.use(cors());

app.get("/emp", async (req, res) => {
  const mongoGetEmp = new MongoGetEmpRepo();
  const gECon = new GetEmpControl(mongoGetEmp);
  const { body, statusCode } = await gECon.handle();
  res.send(body).status(statusCode);
});

app.get("/api", (req, res) => {
  res.json({ fruits: ["maça", "banana", "uva", "morango", "pera"] });
});
app.listen(8080, () => console.log("Server iniciado na porta 8080"));
