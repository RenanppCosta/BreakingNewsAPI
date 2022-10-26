const express = require("express");
const userRouter = require("./src/routes/userRouter")



const app = express();


app.use("/", userRouter)


app.listen(3000, ()=>{
    console.log("Servidor Rodando!")
})