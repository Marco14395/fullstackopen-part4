require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (req, res, next) => {
    if(req.token){
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        req.user = await User.findById(decodedToken.id);
    }
    next()
}

module.exports = userExtractor