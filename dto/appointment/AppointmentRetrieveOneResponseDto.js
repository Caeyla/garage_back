const VehicleRetrieveOneResponseDto = require("../vehicle/VehicleRetrieveOneResponseDto");
const AppointmentStatus = require("../../domain/enumeration/AppointmentStatus");
const PrestationRetrieveOneResponseDto = require("../prestation/PrestationRetrieveOneResponseDto");
const UserRetrieveDto = require("../user/UserRetrieveDto");
const UserType = require("../../domain/enumeration/UserType");
class AppointmentRetrieveOneResponseDto {
    constructor({_id,customerId,vehicleId,prestationId,mechanicId,appointmentDate,status,numAppointment}) {
        this.id = _id;
        this.numAppointment = numAppointment;
        this.customer = new UserRetrieveDto(UserType.CUSTOMER,customerId);
        this.vehicle = new VehicleRetrieveOneResponseDto(vehicleId);
        this.mechanic = new UserRetrieveDto(UserType.MECHANIC,mechanicId);
        this.prestation = new PrestationRetrieveOneResponseDto(prestationId);
        this.appointmentDate = appointmentDate;
        this.status = this.getStatusKey(status);
    }

    getStatusKey(value) {
        return Object.keys(AppointmentStatus).find(key => AppointmentStatus[key] === value) || null;
    }
}

module.exports = AppointmentRetrieveOneResponseDto;