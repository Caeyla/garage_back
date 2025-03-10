const bcrypt = require("bcrypt");
const UserType = require("../../enumeration/UserType");
const SecurityConstant = require("../../../constant/SecurityConstant");
const Customer = require("../../models/Customer");
const Employee = require("../../models/Employee");

const SALT_ROUNDS = SecurityConstant.SALT_ROUNDS;

class UserCreateUseCase {
    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async create({name,firstName,email,password,userType,extraData}) {

        this.expectThatRequiredFieldsArePresent({name,firstName,email,password,userType});
        this.exceptThatUserTypeExists(userType);
        this.expectThatEmailHasValidFormat(email);
    
        const hashedPassword = bcrypt.hashSync(password,SALT_ROUNDS);

        if(userType === UserType.CUSTOMER) {
            return this.handleCreateCustomer(
                name,
                firstName,
                email,
                hashedPassword,
                extraData
            );
        } else if(userType === UserType.MANAGER || userType === UserType.MECHANIC) {
            return this.handleCreateEmployee(
                name,
                firstName,
                email,
                hashedPassword,
                extraData,
                userType
            );
        } 
    }

    async handleCreateCustomer(name,firstName,email,password,extraData) {
        const customer = new Customer.Builder()
            .setName(name)
            .setFirstName(firstName)
            .setEmail(email)
            .setPassword(password)
            .setPhone(extraData.phone)
            .setIsActive(true)
            .build();
        return this.customerAdapter.create(customer);
    }

    async handleCreateEmployee(name,firstName,email,password,userType,extraData) {
        const employee = new Employee.Builder()
            .setName(name)
            .setFirstName(firstName)
            .setEmail(email)
            .setPassword(password)
            .setIncome(extraData.income)
            .setIsActive(true)
            .setUnavailableDates(extraData.unavailableDates)
            .setType(userType)
            .build();
        return this.employeeAdapter.create(employee);
    }

    exceptThatUserTypeExists(userType) {
        const userTypes = Object.values(UserType);
        if(!userTypes.includes(userType)) {
            throw new Error(`User type ${userType} does not exist`);
        }
    }

    expectThatEmailHasValidFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            throw new Error(`Email ${email} is not valid`);
        }
    }

    expectThatRequiredFieldsArePresent({name,firstName,email,password,userType}) {
        if(!name || !firstName || !email || !password || !userType) {
            throw new Error("name, firstName, email, password and userType are required");
        }
    }
}

module.exports = UserCreateUseCase;