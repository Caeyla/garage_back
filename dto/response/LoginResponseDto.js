class LoginResponseDto {
    constructor(token,expirationDate,userType) {
        this.jwt = token;
        this.duration = expirationDate;
        this.role = userType;
    }
}

module.exports = LoginResponseDto;