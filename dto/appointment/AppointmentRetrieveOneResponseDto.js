const VehicleRetrieveOneResponseDto = require("../vehicle/VehicleRetrieveOneResponseDto");
const AppointmentStatus = require("../../domain/enumeration/AppointmentStatus");
const PrestationRetrieveOneResponseDto = require("../prestation/PrestationRetrieveOneResponseDto");
class AppointmentRetrieveOneResponseDto {
    constructor({_id,customerId,vehicleId,prestationId,appointmentDate,status,numAppointment}) {
        this.id = _id;
        this.numAppointment = numAppointment;
        this.customerId = customerId;
        this.vehicle = new VehicleRetrieveOneResponseDto(vehicleId);
        this.prestation = new PrestationRetrieveOneResponseDto(prestationId);
        this.appointmentDate = appointmentDate;
        this.status = this.getStatusKey(status);
    }

    getStatusKey(value) {
        return Object.keys(AppointmentStatus).find(key => AppointmentStatus[key] === value) || null;
    }
}

module.exports = AppointmentRetrieveOneResponseDto;