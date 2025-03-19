const AppointmentRetrieveOneResponseDto = require("../../../dto/appointment/AppointmentRetrieveOneResponseDto");
const AppointmentRetrieveManyResponseDto = require("../../../dto/appointment/AppointmentRetrieveManyResponseDto");
const CustomError = require("../../../error/CustomError");

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

    async retrieveByCustomerId(customerId) {
        const appointments = await this.appointmentAdapter.findByCustomerId(customerId);
        return new AppointmentRetrieveManyResponseDto(appointments);
    }

}

module.exports = AppointmentRetrieveUseCase;