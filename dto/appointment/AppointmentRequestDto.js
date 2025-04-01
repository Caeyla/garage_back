const Appointment = require("../../domain/models/Appointment");
class AppointmentRequestDto{
    constructor({vehicleId,prestationId,appointmentDate}) {
        this.vehicleId = vehicleId;
        this.prestationId = prestationId;
        this.appointmentDate = appointmentDate;
    }

    toAppointmentModel(){
        return new Appointment.Builder()
            .setVehicleId(this.vehicleId)
            .setPrestationId(this.prestationId)
            .setAppointmentDate(this.appointmentDate)
            .build();
    }
}

module.exports = AppointmentRequestDto;