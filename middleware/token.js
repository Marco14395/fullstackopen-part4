require("dotenv").config();

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith('bearer '))
    {
        req.token = authorization.split(" ")[1];
    }
    next();
}

module.exports = tokenExtractor