const bcrypt = require("bcrypt");
const SecurityConstant = require("../../../constant/SecurityConstant");
const jwt = require('jsonwebtoken');
const LoginResponseDto = require('../../../dto/response/LoginResponseDto');
const UserType = require("../../../domain/enumeration/UserType");


class UserLoginUseCase {
    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async login(email, password) {
        const customerUser = await this.customerAdapter.findByEmail(email);
        const employeeUser = await this.employeeAdapter.findByEmail(email);
        if(! customerUser && ! employeeUser) {
            throw new Error("Invalid email or password");
            
        }
        const user = customerUser || employeeUser;
        if(!bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid email or password");
        }
        
        const expirationDate = this.getExpirationDate();
        const userType = this.getUserType(user);
        const token = this.generateToken(user,userType,expirationDate);


        return new LoginResponseDto(
            token,
            userType
        );
    }


    generateToken(user,userType,expirationDate) {
        if(!SecurityConstant.SECRET_KEY){
            throw new Error("Secret key is not set");
        }
        return jwt.sign({
            id: user.id,
            userType: userType,
            expirationDate: expirationDate 
        },
        SecurityConstant.SECRET_KEY,
        {expiresIn: SecurityConstant.TOKEN_DURATION+'h'}
        );
    }

    getUserType(user) {
        if(user.type){
            return user.type;
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