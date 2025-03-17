const CustomError = require('./CustomError');
function handleErrorThrowing(reponse,error) {
    if (error instanceof CustomError) {
        return reponse.status(error.statusCode).json({ message: error.message });
    }
    return reponse.status(500).json({ message: error.message });
}

module.exports = handleErrorThrowing;