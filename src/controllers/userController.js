const userService = require("../services/userService");
const mongoose = require("mongoose");

const create = async (req, res) =>{
    try { 
        
    const { name, username, email, password, avatar, background }= req.body

    if(!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({message: "Todos os campos enviados"})
    }

    const user = await userService.create(req.body);

    if(!user){
        return res.send(400).send({message: "Error na criação do usuário"})
    }

    res.status(201).send({message: "Usuario criado com sucesso!", 
    user: {
        id: user.id,
        name,
        username,
        email,
        password,
        avatar,
        background
    },
});
    } catch(err) {
        res.status(500).send({message: err.message});
    }

};

const findAll = async (req, res)=>{
   try {
    const users = await userService.findAll();

    if(users.length === 0){
        return res.status(400).send({message:"Não há usuários cadastrados"});
    }

    res.send(users)
  } catch(err) {
    res.status(500).send({message: err.message});
}
};

const findById = async (req,res)=>{
    try {
    const user = req.user;
    res.send(user);
    } catch(err) {
        res.status(500).send({message: err.message})
    }
};

const update = async (req,res)=>{
    try {

    const { name, username, email, password, avatar, background }= req.body;

    if(!name && !username && !email && !password &&  !avatar && !background){
        res.status(400).send({message: "Todos os campos precisam sr enviados"});
    }

    const {id, user} = req;

    await userService.update(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    );
    res.send({message: "Usário atualizado com sucesso!"}); 
    
    } catch(err) {
     res.status(500).send({message: err.message})
    }
};

module.exports = {
    create,
    findAll,
    findById,
    update
}