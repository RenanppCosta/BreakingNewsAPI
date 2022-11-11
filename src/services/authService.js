const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginService = (email) =>  User.findOne({email: email}).select("+password");

const generateToken = (id) => jwt.sign({id:id}, process.env.SECRET_JWT, {expiresIn : "24h"});

module.exports = {
    loginService,
    generateToken
}