const Appointment = require("../../domain/models/Appointment");
class AppointmentRequestDto{
    constructor({vehicleId,prestationIds,appointmentDate}) {
        this.vehicleId = vehicleId;
        this.prestationIds = prestationIds;
        this.appointmentDate = appointmentDate;
    }

    toAppointmentModel(){
        return new Appointment.Builder()
            .setVehicleId(this.vehicleId)
            .setPrestationIds(this.prestationIds)
            .setAppointmentDate(this.appointmentDate)
            .build();
    }
}

module.exports = AppointmentRequestDto;