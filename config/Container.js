const UserCreateUseCase = require("../domain/usecases/user/UserCreateUseCase");
const UserLoginUseCase = require("../domain/usecases/user/UserLoginUseCase");
const UserRetrieveUseCase = require("../domain/usecases/user/UserRetrieveUseCase");
const CustomerAdapter = require("../adapters/CustomerAdapter");
const EmployeeAdapter = require("../adapters/EmployeeAdapter");
const UserUpdateteUseCase = require("../domain/usecases/user/UserUpdateUseCase");


const customerAdapter = new CustomerAdapter();
const employeeAdapter = new EmployeeAdapter();

const userCreateUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
const userLoginUseCase = new UserLoginUseCase(customerAdapter, employeeAdapter);
const userRetrieveUseCase = new UserRetrieveUseCase(customerAdapter, employeeAdapter);
const userUpdateUseCase =  new UserUpdateteUseCase(customerAdapter, employeeAdapter);

module.exports = {
    userCreateUseCase,
    userLoginUseCase,
    userRetrieveUseCase,
    userUpdateUseCase
}