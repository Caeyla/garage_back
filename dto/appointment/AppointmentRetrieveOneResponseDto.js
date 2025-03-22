const VehicleRetrieveOneResponseDto = require("../vehicle/VehicleRetrieveOneResponseDto");
const PrestationRetrieveManyResponseDto = require("../prestation/PrestationRetrieveManyResponseDto");
class AppointmentRetrieveOneResponseDto {
    constructor({_id,customerId,vehicleId,prestationIds,appointmentDate}) {
        this.id = _id;
        this.customerId = customerId;
        this.vehicle = new VehicleRetrieveOneResponseDto(vehicleId);
        this.prestations = new PrestationRetrieveManyResponseDto(prestationIds).prestations;
        this.appointmentDate = appointmentDate;
    }
}

module.exports = AppointmentRetrieveOneResponseDto;