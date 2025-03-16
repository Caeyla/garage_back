const CustomerAdapter = require("../adapters/CustomerAdapter");
const EmployeeAdapter = require("../adapters/EmployeeAdapter");
const VehicleAdapter = require("../adapters/VehicleAdapter");

const UserCreateUseCase = require("../domain/usecases/user/UserCreateUseCase");
const UserLoginUseCase = require("../domain/usecases/user/UserLoginUseCase");
const UserRetrieveUseCase = require("../domain/usecases/user/UserRetrieveUseCase");
const UserUpdateteUseCase = require("../domain/usecases/user/UserUpdateUseCase");

const VehicleCreateUseCase = require("../domain/usecases/vehicle/VehicleCreateUseCase");
const VehicleUpdateUseCase = require("../domain/usecases/vehicle/VehicleUpdateUseCase");


const customerAdapter = new CustomerAdapter();
const employeeAdapter = new EmployeeAdapter();
const vehicleAdapter = new VehicleAdapter();

const userCreateUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
const userLoginUseCase = new UserLoginUseCase(customerAdapter, employeeAdapter);
const userRetrieveUseCase = new UserRetrieveUseCase(customerAdapter, employeeAdapter);
const userUpdateUseCase =  new UserUpdateteUseCase(customerAdapter, employeeAdapter);

const vehicleCreateUseCase = new VehicleCreateUseCase(vehicleAdapter,customerAdapter);

const vehicleUpdateUseCase = new VehicleUpdateUseCase(vehicleAdapter,customerAdapter);

module.exports = {
    userCreateUseCase,
    userLoginUseCase,
    userRetrieveUseCase,
    userUpdateUseCase,
    vehicleCreateUseCase,
    vehicleUpdateUseCase
}