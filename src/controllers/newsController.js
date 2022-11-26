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
        user: req.userId
       });

       res.send(201);

    }catch(err) {
        res.status(500).send({message: err.message});
       }
    
};

const findAll = async (req,res)=>{
    try {
        let { limit, offset } = req.query;
    
        limit = Number(limit);
        offset = Number(offset);
    
        if (!limit) {
          limit = 5;
        }
    
        if (!offset) {
          offset = 0;
        }
    
        const news = await newsService.findAll(offset, limit);
        const total = await newsService.countNews();
        const currentUrl = req.baseUrl;
    
        const next = offset + limit;
        const nextUrl =
          next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl =
          previous != null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            : null;
    
        if (news.length === 0) {
          return res.status(400).send({
            message: "Não há notícias registradas",
          });
        }
        res.send({
          nextUrl,
          previousUrl,
          limit,
          offset,
          total,
    
          results: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
          })),
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
};

const topNews = async (req,res)=>{
    try{

    }catch(err){
        res.status(500).send({message: err.message})
    }
    const news = await newsService.topNews();

    if(!news){
        res.status(400).send({message:"Não uma notícia cadastrada."})
    };

    res.send({
        news:{
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar,
        }
    })

};

const findById = async (req,res)=>{
    try {
        const {id} = req.params;

        const news = await newsService.findById(id)

        return res.send({
            news:{
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })

    } catch (err) {
        res.status(500).send({message: err.message})
    }
};

const searchByTitle = async (req,res)=>{
    try {
        const { title } = req.query;
        const news = await newsService.searchByTitle(title);
    
        if (news.length === 0) {
          return res
            .status(400)
            .send({ message: "Não há notícias com este título" });
        }
    
        return res.send({
          results: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
          })),
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };

    const byUser = async (req, res)=>{
      try {
        const id = req.userId;
        const news = await newsService.byUser(id);

        return res.send({
          results: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
          })),
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };


module.exports = {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser
}