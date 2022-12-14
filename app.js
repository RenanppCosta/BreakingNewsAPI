const express = require("express");
const conectDb = require("./src/database/db");
const dotenv = require("dotenv").config();

const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/authRouter");
const newsRouter = require("./src/routes/newsRouter");

const port = process.env.PORT || 3000;
const app = express();

conectDb();
app.use(express.json());
app.use("/", userRouter);
app.use("/login", authRouter);
app.use("/news", newsRouter);

app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}!`);
});