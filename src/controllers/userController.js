const userService = require("../services/userService")

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


module.exports = {
    create
}