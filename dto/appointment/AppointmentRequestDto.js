const Appointment = require("../../domain/models/Appointment");
class appointmentRequestDto{
    constructor({customerId,vehicleId,prestationIds,appointmentDate}) {
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.prestationIds = prestationIds;
        this.appointmentDate = appointmentDate;
    }

    toAppointmentModel(){
        return new Appointment.Builder()
            .setCustomerId(this.customerId)
            .setVehicleId(this.vehicleId)
            .setPrestationIds(this.prestationIds)
            .setAppointmentDate(this.appointmentDate)
            .build();
    }
}

module.exports = appointmentRequestDto;