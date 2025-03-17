const UserType = require("../../domain/enumeration/UserType");

class UserRetrieveDto {
    constructor(userType,user) {
        console.log(user);
        this.id = user.id;
        this.lastname = user.name;
        this.firstname = user.firstName;
        this.email = user.email;
        //Because customer have no user type on his model
        this.userType = userType;
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