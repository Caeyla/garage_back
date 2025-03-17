const authorizationMiddleware = function (req, res, next) {
    const userId = req.userId;
    const userType = req.userType;
    next();
}
module.exports = authorizationMiddleware;