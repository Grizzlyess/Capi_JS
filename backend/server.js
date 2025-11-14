import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);


app.listen(8080, () => console.log("Servidor iniciado na porta 8080"));