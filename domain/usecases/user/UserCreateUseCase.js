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

    async create(createUserDto) {
        this.exceptThatUserTypeExists(createUserDto.userType);
        UserService.expectThatRequiredFieldsArePresent(createUserDto);
        this.expectThatEmailHasValidFormat(createUserDto.email);
    
        const hashedPassword = bcrypt.hashSync(createUserDto.password,SALT_ROUNDS);

        if(createUserDto.userType  === UserType.CUSTOMER) {
            return this.handleCreateCustomer(
                createUserDto.name,
                createUserDto.firstName,
                createUserDto.email,
                hashedPassword,
                createUserDto.extraData
            );
        } else if(createUserDto.userType === UserType.MANAGER || createUserDto.userType === UserType.MECHANIC) {
            return this.handleCreateEmployee(
                createUserDto.name,
                createUserDto.firstName,
                createUserDto.email,
                hashedPassword,
                createUserDto.userType,
                createUserDto.extraData
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