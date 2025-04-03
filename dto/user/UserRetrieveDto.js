const UserType = require("../../domain/enumeration/UserType");
const PrestationRetrieveManyResponseDto = require("../prestation/PrestationRetrieveManyResponseDto");
const { UnavailableDateRetrieveManyResponseDto } = require("../unavailableDate/UnavailableDateRetrieveResponseDto");
class UserRetrieveDto {
    constructor(userType,user) {
        this.id =  user._id;
        this.lastname = user.name;
        this.firstname = user.firstName;
        this.email = user.email;
        //Because customer have no user type on his model
        this.userType = userType;
        this.isActive = user.isActive;
        if(userType === UserType.CUSTOMER){
            this.extraData = {
                phone : user.phone
            }
        }else if(userType === UserType.MANAGER || UserType.MECHANIC){
            this.extraData = {
                income :  user.income,
                unavailableDates : new UnavailableDateRetrieveManyResponseDto(user.unavailableDates).unavailableDates,
                prestations : new PrestationRetrieveManyResponseDto(user.prestations).prestations
            }
        }
    }
}

module.exports = UserRetrieveDto;