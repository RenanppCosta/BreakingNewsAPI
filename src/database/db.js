const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect("mongodb+srv://root:renan2012nha@cluster0.fq9i7wz.mongodb.net/?retryWrites=true&w=majority", 
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=> console.log("Banco de dados conectado"))
    .catch((error)=> console.log(error))
}


module.exports = connectDb
