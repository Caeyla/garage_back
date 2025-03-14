const UserType = require("../../domain/enumeration/UserType");

class UserRetrieveDto {
    constructor(userType,user) {
        this.id = user.id;
        this.name = user.name;
        this.firstname = user.firstName;
        this.email = user.email;
        this.userType = user.userType;
        if(userType === UserType.CUSTOMER){
            this.extraData = {
                phone : user.phone
            }
        }else if(userType === UserType.MANAGER || UserType.MECHANIC){
            this.extraData = {
                income :  user.income,
                unavailableDates : user.unavailableDates
            }
        }
    }
}

module.exports = UserRetrieveDto;