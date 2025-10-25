//Backend modulos
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get("/api",(req,res) => {
    res.json({"fruits":["maça","banana","uva","morango","pera"]})
})
app.listen(8080,() => console.log("Server iniciado na porta 8080"))