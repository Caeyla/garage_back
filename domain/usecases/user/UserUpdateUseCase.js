const UserType = require("../../enumeration/UserType");
const CustomError = require("../../../error/CustomError");
const UserRetrieveDto = require("../../../dto/user/UserRetrieveDto");

class UserUpdateteUseCase {
    constructor(customerAdapter, employeeAdapter) {
        this.customerAdapter = customerAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async update(userId,updateUserData) {
        const userFromDb = await this.findUserById(userId);
        
        if(userFromDb.userType === UserType.MANAGER || userFromDb.userType === UserType.MECHANIC) {
            return await  this.handleUpdateEmployee(
                userFromDb,
                updateUserData.toEmployeeModel()
            );
        }else{
            return await this.handleUpdateCustomer(
               userFromDb,
               updateUserData.toCustomerModel()
            );
        }
    }

    async findUserById(id) {
        const userCustomer = await this.customerAdapter.findById(id);
        const userEmployee = await this.employeeAdapter.findById(id);
        if(!userCustomer && !userEmployee) {
            throw new CustomError("User not found",404);
        }
        const user = userCustomer || userEmployee;
        return user;
    }

    async handleUpdateCustomer(userFromDb,updateData) {
        const customerUpdates = {
            name: updateData.name || userFromDb.name,
            firstName: updateData.firstName || userFromDb.firstName,
            phone: updateData.phone || userFromDb.phone,
            isActive: updateData.isActive ?? userFromDb.isActive
        }
        await this.customerAdapter.update(userFromDb._id,customerUpdates);
        const updatedCustomer = await this.customerAdapter.findById(userFromDb._id);
        return new UserRetrieveDto(UserType.CUSTOMER,updatedCustomer);
    }

    async handleUpdateEmployee(userFromDb,updateData) {
        const employeeUpdates = {
            name: updateData.name || userFromDb.name,
            firstName: updateData.firstName || userFromDb.firstName,
            income: updateData.income || userFromDb.income,
            unavailableDates: updateData.unavailableDates || userFromDb.unavailableDates,
            isActive: updateData.isActive ?? userFromDb.isActive
        }
        await this.employeeAdapter.update(userFromDb._id,employeeUpdates);
        const updatedEmployee = await this.employeeAdapter.findById(userFromDb._id);
        return new UserRetrieveDto(userFromDb.userType,updatedEmployee);
    }
}

module.exports = UserUpdateteUseCase;