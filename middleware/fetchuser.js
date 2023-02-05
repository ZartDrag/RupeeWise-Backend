var jwt = require('jsonwebtoken');
const JWTSECRET = "SomeGoodJWTSECRETStringHardcodedTemporarily";

const fetchuser = (req, res, next) => {
    // Get user deets from the jwt token

    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error : "Invalid Token"});
    }
    
    try {
        const data = jwt.verify(token, JWTSECRET);
        req.user = data.user;
        next(); 
        //the next function is called from where this middleware is being called
    } catch(error) {
        res.status(401).send({error : "Invalid Token"});
    }
}

module.exports = fetchuser;