const UserType = require("../../domain/enumeration/UserType");
const UserRetrieveDto = require("./UserRetrieveDto");

class UserRetrieveManyDto {
    constructor(userType,users) {
        this.users = users.map(user => new UserRetrieveDto(userType,user));
    }
}

module.exports = UserRetrieveManyDto;