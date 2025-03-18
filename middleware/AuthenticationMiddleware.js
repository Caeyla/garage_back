const JwtService = require('../domain/services/JwtService');

const ignoredPathForAuthentification = ['user/login']
const authenticationMiddleware = (req, res, next) => {

    if (ignoredPathForAuthentification.includes(req.path)) return next();
    
    const token = req.headers['authorization'];
    
    if (!token) return res.status(401).send({ message: 'No token provided' });
    try{
        const userInformation = JwtService.decodeTokenFromRequest(req);
        req.userId = userInformation.id;
        req.userType = userInformation.userType;
        next();
    } catch(error){
        res.status(401).send({ message: error.message });
    }
}

module.exports = authenticationMiddleware;