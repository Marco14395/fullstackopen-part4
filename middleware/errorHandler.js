
const errorHandler = (err, req, res, next) => {
    if(err.name === "CastError"){
        return res.status(400).send({
            error: "Malformatted Id"
        });
    } else if (err.name === "ValidationError") {
        return res.status(400).json({error: error.message});
    } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({error: "Invalid Token"});
    } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({error: "Token expired"});
    }
    
    next(err);
}

module.exports = errorHandler