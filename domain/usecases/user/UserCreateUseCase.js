const bcrypt = require("bcrypt");
const UserType = require("../../enumeration/UserType");
const SecurityConstant = require("../../../constant/SecurityConstant");
const UserService = require("../../services/UserService");
const CustomError = require("../../../error/CustomError");
const UserRetrieveDto = require("../../../dto/user/UserRetrieveDto");
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
            return this.handleCreateCustomer(userRequestDto,hashedPassword);
        } else if(userRequestDto.userType === UserType.MANAGER || userRequestDto.userType === UserType.MECHANIC) {
            return this.handleCreateEmployee(userRequestDto,hashedPassword);
        } 
    }

    async handleCreateCustomer(userRequestDto,hashedPassword) {
        const customer = userRequestDto.toCustomerModel();
        customer.setPassword(hashedPassword);
        customer.setIsActive(true);
        const createdCustomer  = await this.customerAdapter.create(customer);
        return new UserRetrieveDto(UserType.CUSTOMER,createdCustomer)
    }

    async handleCreateEmployee(userRequestDto,hashedPassword) {
        const employee = userRequestDto.toEmployeeModel();
        employee.setPassword(hashedPassword);
        employee.setIsActive(true);
        const createdEmployee = await this.employeeAdapter.create(employee);
        return new UserRetrieveDto(userRequestDto.userType,createdEmployee);
    }

    exceptThatUserTypeExists(userType) {
        const userTypes = Object.values(UserType);
        if(!userTypes.includes(userType)) {
            throw new CustomError(`User type ${userType} does not exist`,500);
        }
    }

    expectThatEmailHasValidFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            throw new CustomError(`Email ${email} is not valid`,500);
        }
    }

}

module.exports = UserCreateUseCase;