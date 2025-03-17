const JwtService = require('../domain/services/JwtService');
const authenticationMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });
    const userInformation = JwtService.decodeTokenFromRequest(req);
    req.userId = userInformation.id;
    req.userType = userInformation.userType;
    next();
}

module.exports = authenticationMiddleware;