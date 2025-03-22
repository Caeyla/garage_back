const VehicleRetrieveOneResponseDto = require("../vehicle/VehicleRetrieveOneResponseDto");
const PrestationRetrieveManyResponseDto = require("../prestation/PrestationRetrieveManyResponseDto");
const AppointmentStatus = require("../../domain/enumeration/AppointmentStatus");
class AppointmentRetrieveOneResponseDto {
    constructor({_id,customerId,vehicleId,prestationIds,appointmentDate,status}) {
        this.id = _id;
        this.customerId = customerId;
        this.vehicle = new VehicleRetrieveOneResponseDto(vehicleId);
        this.prestations = new PrestationRetrieveManyResponseDto(prestationIds).prestations;
        this.appointmentDate = appointmentDate;
        this.status = this.getStatusKey(status);
    }

    getStatusKey(value) {
        return Object.keys(AppointmentStatus).find(key => AppointmentStatus[key] === value) || null;
    }
}

module.exports = AppointmentRetrieveOneResponseDto;