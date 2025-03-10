const User = require('./User');
const userType = require('../enumeration/UserType');

class Employee extends User{
    constructor(id,name,firstName,email,password,income,isActive,unvailableDates,type) {
        super(id,name,firstName,email,password,isActive);
        this.unvailableDates = unvailableDates;   
        this.income = income;
        this.type = type
    }

    register(employeeAdapter){
        super.register();
        employeeAdapter.create(this);
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.firstName = "";
                this.email = "";
                this.password = "";
                this.income = 0;
                this.isActive = false;
                this.unvailableDates = [];
                this.type = undefined
            }
    
            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setFirstName(firstName) { this.firstName = firstName; return this; }
            setEmail(email) { this.email = email; return this; }
            setPassword(password) { this.password = password; return this; }
            setIncome(income) { this.income = income; return this; }
            setIsActive(isActive) { this.isActive = isActive; return this; }
            setUnavailableDates(dates) { this.unvailableDates = dates; return this; }
            setType(type) { this.type = type; return this; }
            build() {
                return new Employee(
                    this.id,
                    this.name,
                    this.firstName,
                    this.email,
                    this.password,
                    this.income,
                    this.isActive,
                    this.unvailableDates,
                    this.type
                );
            }
        }
        return Builder;
    }
    
}

module.exports = Employee;