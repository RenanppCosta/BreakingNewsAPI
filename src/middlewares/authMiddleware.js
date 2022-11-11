const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const authMiddleware = (req,res,next)=>{
    try{
        const { authorization } = req.headers;

        if(!authorization){
        res.send(401);
    }

        const parts = authorization.split(" ");

        const [schema, token] = parts;

        if(parts.length !==2){
        res.send(401);
    }

        if(schema !== "Bearer"){
        res.send(401);
    }

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded)=>{
            if(err){
                res.status(401).send({message:"Token expirou."});
                return;
            }
           
            const user =  await userService.findById(decoded.id);

            if(!user || !user.id){
                res.status(401).send({message:"Token inválido."});
            };

            req.userId = user.id;

            return next();    
    });
    
    } catch(err){
        res.status(500).send({message: err.message});
    }

}

module.exports = authMiddleware;