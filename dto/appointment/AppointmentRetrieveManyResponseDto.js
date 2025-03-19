const AppointmentRetrieveOneResponseDto = require("./AppointmentRetrieveOneResponseDto");

class AppointmentRetrieveManyResponseDto {
    constructor(appointments) {
        this.appointments = this.convertToResponseDto(appointments);
    }

    convertToResponseDto(appointments) {
        for(let i = 0; i < appointments.length; i++){
            appointments[i] = new AppointmentRetrieveOneResponseDto(appointments[i]);
        }
        return appointments;
    }
}

module.exports = AppointmentRetrieveManyResponseDto;