const DateTimeInterval = require("../../models/DateTimeInterval");
const CustomError = require("../../../error/CustomError");
const UserType = require("../../../domain/enumeration/UserType");
const UserRetrieveDto = require("../../../dto/user/UserRetrieveDto");
const e = require("express");
class AddUnavailabilityUseCase {
    constructor(employeeAdapter) {
        this.employeeAdapter = employeeAdapter;
    }

    async addUnavailabilities(employeeId,unavailableDate) {
        this.expectThatBodyIsValid(unavailableDate);
        const employee = await this.employeeAdapter.findById(employeeId);
        if (!employee || employee.userType != UserType.MECHANIC) {
            throw new CustomError("Mechanic does not exist", 404);
        }
        const unavailabilitiesFromDb = employee.unavailableDates || [];
        unavailabilitiesFromDb.push(unavailableDate)
        const update = {
            unavailableDates:  unavailabilitiesFromDb,
        };

        await this.employeeAdapter.update(employeeId, update);
        const employeeUpdated = await this.employeeAdapter.findById(employeeId)
        return new UserRetrieveDto(UserType.MECHANIC,employeeUpdated);
    }

    expectThatBodyIsValid(unavailabilities) {
        if(!unavailabilities) {
            throw new CustomError("Unavailabilities required", 400);
        }
        let requiredFields = [];
        if(!unavailabilities.startDate) {
            requiredFields.push("startDate");
        }
        if(!unavailabilities.endDate) {
            requiredFields.push("endDate");
        }
        if(requiredFields.length > 0) {
            throw new CustomError(`The following fields are required: ${requiredFields.join(", ")}`, 400);
        }
        this.expectThatStartDateIsBeforeEndDate(unavailabilities);
        this.expectThatStartDateIsAfterNow(unavailabilities);
    }

    expectThatStartDateIsBeforeEndDate(unavailabilities) {
        if(unavailabilities.startDate > unavailabilities.endDate) {
            throw new CustomError("Start date must be before end date", 400);
        }
    }

    expectThatStartDateIsAfterNow(unavailabilities) {
        const now = new Date();
        if(unavailabilities.startDate < now) {
            throw new CustomError("Start date must be in the future", 400);
        }
    }
}

module.exports = AddUnavailabilityUseCase;