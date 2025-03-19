class AppointmentRetrieveOneResponseDto {
    constructor({_id,customerId,vehicleId,prestationIds,appointmentDate}) {
        this.id = _id;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.prestationIds = prestationIds;
        this.appointmentDate = appointmentDate;
    }
}

module.exports = AppointmentRetrieveOneResponseDto;