const jwt = require("jsonwebtoken");
const SecurityConstant = require("../../constant/SecurityConstant");

class JwtService {
  static isValidToken(token) {
    throw new Error("Method not implemented.");
  }

  static decodeToken(token) {
    if (!token) {
      return null;
    }
    const decoded = jwt.verify(token, SecurityConstant.SECRET_KEY);
    return decoded;
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
}

module.exports = JwtService;
