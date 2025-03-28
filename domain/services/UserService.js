const UserType = require("../enumeration/UserType");
const CustomError = require("../../error/CustomError");

class UserService {
    static expectThatRequiredFieldsArePresent({name,firstName,email,password,extraData,userType}) {
        const  errorMessages = [];  
        if(!name){errorMessages.push("name")}
        if(!firstName){errorMessages.push("firstname")}
        if(!email){errorMessages.push("email")}
        if(!password){errorMessages.push("password")}
        if(!extraData){errorMessages.push("extraData")}
        if(extraData && userType === UserType.CUSTOMER){
            this.expectThatCustomerFieldsArePresent(errorMessages,extraData);
        }else if (extraData && userType === UserType.MANAGER || userType === UserType.MECHANIC){
            this.expectThatEmployeeFieldsArePresent(errorMessages,extraData);
        }

        if(errorMessages.length > 0){
            const requiredFields = errorMessages.join(", ");
            throw new CustomError(`The following fields are required: ${requiredFields}`,500);
        }
        
    }

    static expectThatCustomerFieldsArePresent(errorMessages,extraData) {
        if(!extraData.phone){
            errorMessages.push("phone");
        }
    }

    static expectThatEmployeeFieldsArePresent(errorMessages,extraData) {
        if(!extraData.income){
            errorMessages.push("income");
        }
        if(!extraData.unavailableDates){
            errorMessages.push("unavailableDates");
        }
    }
}

module.exports = UserService;