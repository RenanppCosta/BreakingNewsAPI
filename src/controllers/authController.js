const bcrypt = require("bcrypt");
const authService = require("../services/authService")

const login = async (req, res)=>{
    const {email, password} = req.body;
   
    try{
        
        const user = await authService.loginService(email);

        if(!user){
            return res.status(404).send({message:"A senha ou o Usuário estão incorretos."})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid){
            return res.status(404).send({message:"A senha ou o Usuário estão incorretos."});
        }

        res.send("Logado");
        

    } catch(err){
        res.status(500).send({message: err.message});
    }
    
}

module.exports = {
    login
}