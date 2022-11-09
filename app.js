const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRouter");
const conectDb = require("./src/database/db");

const port = 3000;

conectDb();
app.use(express.json());
app.use("/", userRouter);


app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}!`);
});