const jwt = require("jsonwebtoken");
const SecurityConstant = require("../../constant/SecurityConstant");
const CustomError = require("../../error/CustomError");

class JwtService {
  static isValidToken(token) {
    throw new Error("Method not implemented.");
  }

  static decodeToken(token) {
    if (!token) {
      return null;
    }
    try{
      const decoded = jwt.verify(token, SecurityConstant.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new CustomError(error.message,401);
    }
  }

  static generateToken(user, userType, expirationDate) {
    if (!SecurityConstant.SECRET_KEY) {
      throw new Error("Secret key is not set");
    }
    return jwt.sign(
      {
        id: user.id,
        userType: userType,
        expirationDate: expirationDate,
      },
      SecurityConstant.SECRET_KEY,
      { expiresIn: SecurityConstant.TOKEN_DURATION + "h" }
    );
  }

  static decodeTokenFromRequest(request){
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.replace('Bearer ','');
    return this.decodeToken(token);
  }
}

module.exports = JwtService;
