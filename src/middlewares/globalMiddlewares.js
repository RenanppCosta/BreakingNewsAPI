const mongoose = require("mongoose");
const userService = require("../services/userService");

const validId = ( req, res, next)=>{
    try{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Id não encontrado"});
    }

    next();
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

const validUser = async ( req, res, next)=>{
    try{
    const id = req.params.id;

    const user = await userService.findById(id);

    if(!user){
        return res.status(400).send({message:"Usuário não encontrado!"});
    }

    req.user = user;
    req.id = id;

    next();

    } catch(err) {
        res.status(500).send({message: err.message})
    }
}


module.exports = {
    validId,
    validUser
}