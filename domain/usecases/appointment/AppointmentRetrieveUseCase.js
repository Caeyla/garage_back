const AppointmentRetrieveOneResponseDto = require("../../../dto/appointment/AppointmentRetrieveOneResponseDto");
const AppointmentRetrieveManyResponseDto = require("../../../dto/appointment/AppointmentRetrieveManyResponseDto");
const CustomError = require("../../../error/CustomError");
const AppointmentStatus = require("../../enumeration/AppointmentStatus");

class AppointmentRetrieveUseCase {
    constructor(appointmentAdapter) {
        this.appointmentAdapter = appointmentAdapter;
    }

    async retrieveByIdAndCustomerId(id,customerId) {
        const appointment = await this.appointmentAdapter.findByIdAndCustomerId(id,customerId);
        if(!appointment) {
            throw new CustomError("Appointment not found",404);
        }
        return new AppointmentRetrieveOneResponseDto(appointment);
    }

    async retrieveRemainingAppointmentByCustomerId(customerId) {
        const filter = {
            customerId,
            status: { $eq: AppointmentStatus.SCHEDULED }
        };
        const appointments = await this.appointmentAdapter.findByCustomerIdAndFilter(filter);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }
        
    async retrieveAppointmentHistoricByCustomerId(customerId) {
        const filter = {
            customerId,
            status: { $lt: AppointmentStatus.SCHEDULED }
        };
        const appointments = await this.appointmentAdapter.findByCustomerIdAndFilter(filter);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }

}

module.exports = AppointmentRetrieveUseCase;