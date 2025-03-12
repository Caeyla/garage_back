class CreateUserDto {
    constructor({name, firstname, email, password, userType, extraData}) {
        this.name = name;
        this.firstName = firstname;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.extraData = extraData;
    }
}

module.exports = CreateUserDto;

/*
    EXTRA DATA for customer : 
    {
        phone: "1234567890"
    }

    EXTRA DATA for employee : 
    {
        income: 1000,
        unavailableDates: ["2023-01-01", "2023-01-02"]
    }
*/