const bcrypt = require("bcrypt");
const UserType = require("../../enumeration/UserType");
const SecurityConstant = require("../../../constant/SecurityConstant");
const Customer = require("../../models/Customer");
const Employee = require("../../models/Employee");
const UserService = require("../../services/UserService");

const SALT_ROUNDS = SecurityConstant.SALT_ROUNDS;

class UserCreateUseCase {
    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async create(userRequestDto) {
        this.exceptThatUserTypeExists(userRequestDto.userType);
        UserService.expectThatRequiredFieldsArePresent(userRequestDto);
        this.expectThatEmailHasValidFormat(userRequestDto.email);
    
        const hashedPassword = bcrypt.hashSync(userRequestDto.password,SALT_ROUNDS);

        if(userRequestDto.userType  === UserType.CUSTOMER) {
            return this.handleCreateCustomer(
                userRequestDto.name,
                userRequestDto.firstName,
                userRequestDto.email,
                hashedPassword,
                userRequestDto.extraData
            );
        } else if(userRequestDto.userType === UserType.MANAGER || userRequestDto.userType === UserType.MECHANIC) {
            return this.handleCreateEmployee(
                userRequestDto.name,
                userRequestDto.firstName,
                userRequestDto.email,
                hashedPassword,
                userRequestDto.userType,
                userRequestDto.extraData
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
        return await this.employeeAdapter.create(employee);
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

}

module.exports = UserCreateUseCase;