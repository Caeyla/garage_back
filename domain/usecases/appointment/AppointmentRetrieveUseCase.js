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

    async retrieveRemainingAppointmentByCustomerId(customerId,mechanicId) {
        const filter = {
            status: { $eq: AppointmentStatus.SCHEDULED }
        };
        if(customerId) {
            filter.customerId = customerId;
        }
        if(mechanicId) {
            filter.mechanicId = mechanicId;
        }
        const appointments = await this.appointmentAdapter.findByCustomerIdAndFilter(filter);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }
        
    async retrieveAppointmentHistoricByCustomerId(customerId) {
        const filter = {
            customerId,
            status: { $gt: AppointmentStatus.SCHEDULED }
        };
        const appointments = await this.appointmentAdapter.findByCustomerIdAndFilter(filter);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }

}

module.exports = AppointmentRetrieveUseCase;