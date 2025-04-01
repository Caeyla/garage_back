const DateTimeInterval = require("../../models/DateTimeInterval");
const CustomError = require("../../../error/CustomError");
const UserType = require("../../../domain/enumeration/UserType");
const UserRetrieveDto = require("../../../dto/user/UserRetrieveDto");
const e = require("express");
class AddUnavailabilityUseCase {
    constructor(employeeAdapter) {
        this.employeeAdapter = employeeAdapter;
    }

    async addUnavailabilities(employeeId,unavailabilities) {
        this.expectThatBodyIsValid(unavailabilities);
        const employee = await this.employeeAdapter.findById(employeeId);
        if (!employee || employee.userType != UserType.MECHANIC) {
            throw new CustomError("Mechanic does not exist", 404);
        }
        const unavailabilitiesFromDb = employee.unavailableDates || [];

        const update = {
            unavailableDates:  unavailabilitiesFromDb.concat(unavailabilities),
        };

        await this.employeeAdapter.update(employeeId, update);
        const employeeUpdated = await this.employeeAdapter.findById(employeeId)
        return new UserRetrieveDto(UserType.MECHANIC,employeeUpdated);
    }

    expectThatBodyIsValid(unavailabilities) {
        if(!unavailabilities) {
            throw new CustomError("Unavailabilities required", 400);
        }

    }

}

module.exports = AddUnavailabilityUseCase;