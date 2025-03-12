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

    login(email, password) {
        const customerUser = this.customerAdapter.findByEmail(email);
        const employeeUser = this.employeeAdapter.findByEmail(email);
        if(! customerUser || ! employeeUser) {
            throw new Error("Invalid email or password");
            
        }
        const user = customerUser || employeeUser;
        if(!bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid email or password");
        }
        const token = this.generateToken(user);
        const expirationDate = this.getExpirationDate();
        const userType = this.getUserType(user);

        return new LoginResponseDto(
            token,
            expirationDate,
            userType
        );
    }


    generateToken(user) {
        //TODO : generate token with secret 
        jwt.sign()
    }

    //only Mechanic and MANAGER have user type
    getUserType(user) {
        if(user.userType){
            return user.userType;
        }
        return UserType.CUSTOMER;
    }

    getExpirationDate() {
        let expirationDate = new Date();
        expirationDate.setHours(now.getHours() + SecurityConstant.EXPIRATION_TIME);
        return expirationDate; 
    }
}
