const UserCreateUseCase = require("../domain/usecases/user/UserCreateUseCase");
const UserLoginUseCase = require("../domain/usecases/user/UserLoginUseCase");
const CustomerAdapter = require("../adapters/CustomerAdapter");
const EmployeeAdapter = require("../adapters/EmployeeAdapter");

const customerAdapter = new CustomerAdapter();
const employeeAdapter = new EmployeeAdapter();

const userCreateUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
const userLoginUseCase = new UserLoginUseCase(customerAdapter, employeeAdapter);

module.exports = {
    userCreateUseCase,
    userLoginUseCase
}