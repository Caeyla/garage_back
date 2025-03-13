class LoginResponseDto {
    constructor(token,userType) {
        this.jwt = token;
        this.role = userType;
    }
}

module.exports = LoginResponseDto;