const JwtService = require('../../services/JwtService');
const UserType = require('../../enumeration/UserType');
const UserRetrieveDto = require('../../../dto/user/UserRetrieveDto')

class UserRetrieveUseCase{

    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async retrieveByToken(token) {
        const decodedToken= JwtService.decodeToken(token);
        if(!decodedToken) {
            throw new Error("Invalid token");
        }
        const id = decodedToken.id;
        const userType = decodedToken.userType;
        let user;
        if(userType === UserType.CUSTOMER) {
            user =  await this.customerAdapter.findById(id);
        } else if(userType === UserType.MANAGER || userType === UserType.MECHANIC) {
            user = await this.employeeAdapter.findById(id);
        }

        return new UserRetrieveDto(userType,user);
    }
}

module.exports = UserRetrieveUseCase;