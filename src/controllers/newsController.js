const newsService = require("../services/newsService");

const create = async (req,res)=>{
    try{
       const { title, text, banner} = req.body;

       if(!title || !banner || !text){
        res.status(400).send({message: "Todos os campos precisam ser enviados"});
       }

       await newsService.create({
        title,
        text,
        banner,
        user: { _id: "636c5189d6a18c9fd553ee7f"}
       });

       res.send(201);

    }catch(err) {
        res.status(500).send({message: err.message})
       }
    
};

const findAll = async (req,res)=>{
    const news = await newsService.findAll();

    if(news.length === 0){
        return res.status(400).send({message:"Não há noticias cadastradas"});
    }    
    res.send(news);
    
}


module.exports = {
    create,
    findAll
}