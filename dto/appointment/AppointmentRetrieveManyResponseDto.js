const AppointmentRetrieveOneResponseDto = require("./AppointmentRetrieveOneResponseDto");

class AppointmentRetrieveManyResponseDto {
    constructor(appointments) {
        this.appointments = this.convertToResponseDto(appointments);
    }

    convertToResponseDto(appointments) {
        const appointmentDtos = [];
        for(let i = 0; i < appointments.length; i++){
            appointmentDtos[i] = new AppointmentRetrieveOneResponseDto(appointments[i]);
        }
        return appointmentDtos;
    }
}

module.exports = AppointmentRetrieveManyResponseDto;