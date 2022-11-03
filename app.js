const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRouter");
const conectDb = require("./src/database/db");


conectDb();
app.use(express.json());
app.use("/", userRouter);


app.listen(3000, ()=>{
    console.log("Servidor Rodando!");
})