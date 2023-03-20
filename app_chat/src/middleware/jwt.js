const jwt = require("jsonwebtoken");
const { Error, NotFound } = require("../utils/HttpResponse");

const validateToken = (req, res, next) => {
    try {
        let token = req.headers.authorization || '';
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length)
            const payload = jwt.verify(token, process.env.KEY_SECRET)
            req.userId = payload.id
            return next();
        }
        return next(NotFound(res,"No Existe el token"))

    } catch (error) {
        return next(Error(res,"Error"))
        
    }
}

module.exports = {
    validateToken
}