const userService = require("../services/userService");
const mongoose = require("mongoose");

const create = async (req, res) =>{
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
        id: user._id,
        name,
        username,
        email,
        password,
        avatar,
        background
    }
})

}

const findAll = async (req, res)=>{
    const users = await userService.findAll();

    if(users.length === 0){
        return res.status(400).send({message:"Não há usuários cadastrados"})
    }

    res.send(users)
}

const findById = async (req,res)=>{
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Id não encontrado"});
    }

    const user = await userService.findById(id)

    if(!user){
        return res.status(400).send({message:"Usuário não encontrado"});
    }

    res.send(user)
}

const update = async (req,res)=>{
    const { name, username, email, password, avatar, background }= req.body;

    if(!name && !username && !email && !password &&  !avatar && !background){
        res.status(400).send({message: "Todos os campos enviados"});
    }

    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Id não encontrado"});
    }

    const user = await userService.findById(id);

    if(!user){
        return res.status(400).send({message:"Usuário não encontrado"});
    }

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
}

module.exports = {
    create,
    findAll,
    findById,
    update
}