const bcrypt = require("bcrypt");
const SecurityConstant = require("../../../constant/SecurityConstant");
const LoginResponseDto = require('../../../dto/user/LoginResponseDto');
const UserType = require("../../../domain/enumeration/UserType");
const JwtService = require("../../services/JwtService");
const CustomError = require("../../../error/CustomError");

class UserLoginUseCase {
    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async login(email, password) {
        const customerUser = await this.customerAdapter.findByEmail(email);
        const employeeUser = await this.employeeAdapter.findByEmail(email);
        if(! customerUser && ! employeeUser) {
            throw new CustomError("Invalid email or password",401);
            
        }
        const user = customerUser || employeeUser;
        if(!bcrypt.compareSync(password, user.password)) {
            throw new CustomError("Invalid email or password",401);
        }
        
        const expirationDate = this.getExpirationDate();
        const userType = this.getUserType(user);
        const token = JwtService.generateToken(user,userType,expirationDate);


        return new LoginResponseDto(
            token,
            userType
        );
    }


    getUserType(user) {
        if(user.userType){
            return user.userType;
        }
        return UserType.CUSTOMER;
    }


    getExpirationDate() {
        let expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + SecurityConstant.TOKEN_DURATION);
        return expirationDate; 
    }
}

module.exports = UserLoginUseCase;