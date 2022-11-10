const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect( process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=> console.log("Banco de dados conectado"))
    .catch((error)=> console.log(error))
}


module.exports = connectDb
