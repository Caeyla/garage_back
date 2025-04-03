const DateTimeInterval = require("../../models/DateTimeInterval");
const CustomError = require("../../../error/CustomError");
const UserType = require("../../enumeration/UserType");
const { UnavailableDateRetrieveManyResponseDto } = require("../../../dto/unavailableDate/UnavailableDateRetrieveResponseDto");
const AppointmentRetrieveManyResponseDto = require("../../../dto/appointment/AppointmentRetrieveManyResponseDto");

class RetrieveUnavailabilityUseCase {
    constructor(employeeAdapter, appointmentAdapter) {
        this.employeeAdapter = employeeAdapter;
        this.appointmentAdapter = appointmentAdapter;
    }

    async retrieveUnavailabilityDates(employeeId) {
        const employee = await this.employeeAdapter.findById(employeeId);
        if (!employee || employee.userType != UserType.MECHANIC) {
            throw new CustomError("Mechanic does not exist", 404);
        }
        const unavailabilitiesFromDb = employee.unavailableDates || [];
        return new UnavailableDateRetrieveManyResponseDto(unavailabilitiesFromDb);
    }

    async retrieveAppointments(employeeId) {
        const employee = await this.employeeAdapter.findById(employeeId);
        if (!employee || employee.userType != UserType.MECHANIC) {
            throw new CustomError("Mechanic does not exist", 404);
        }
        const appointments = await this.appointmentAdapter.findByMechanicId(employeeId);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }
}

module.exports = RetrieveUnavailabilityUseCase;