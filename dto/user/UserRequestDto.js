const Customer = require("../../domain/models/Customer");
const Employee = require("../../domain/models/Employee");

class UserRequestDto {
    constructor({name, firstname, email, password, userType, extraData}) {
        this.name = name;
        this.firstName = firstname;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.extraData = extraData;
    }

    toCustomerModel(){
        return new Customer.Builder()
            .setName(this.name)
            .setFirstName(this.firstName)
            .setEmail(this.email)
            .setPassword(this.password)
            .setPhone(this.extraData? this.extraData.phone : null)
            .build();
    }

    toEmployeeModel(){
        return new Employee.Builder()
            .setName(this.name)
            .setFirstName(this.firstName)
            .setEmail(this.email)
            .setPassword(this.password)
            .setIncome(this.extraData? this.extraData.income : null)
            .setUnavailableDates(this.extraData? this.extraData.unavailableDates : null)
            .setType(this.userType)
            .build();
    }
}

module.exports = UserRequestDto;

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