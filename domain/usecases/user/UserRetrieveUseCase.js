const JwtService = require('../../services/JwtService');
const UserType = require('../../enumeration/UserType');
const UserRetrieveDto = require('../../../dto/user/UserRetrieveDto');
const CustomError = require('../../../error/CustomError');

class UserRetrieveUseCase{

    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async retrieveByIdAndUserType(userId,userType) {
        if(!userId) {
            throw new CustomError("User Id required",500);
        }
        let user;
        if(userType === UserType.CUSTOMER) {
            user =  await this.customerAdapter.findById(userId);
        } else if(userType === UserType.MANAGER || userType === UserType.MECHANIC) {
            user = await this.employeeAdapter.findById(userId);
        }

        return new UserRetrieveDto(userType,user);
    }
}

module.exports = UserRetrieveUseCase;