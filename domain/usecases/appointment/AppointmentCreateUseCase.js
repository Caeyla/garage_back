const CustomError = require('../../../error/CustomError');
const AppointmentRetrieveOneResponseDto = require('../../../dto/appointment/AppointmentRetrieveOneResponseDto');
const AppointmentStatus = require('../../enumeration/AppointmentStatus');
class AppointmentCreateUseCase {
    constructor(appointmentAdapter,vehicleAdapter,prestationAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.vehicleAdapter = vehicleAdapter;
        this.prestationAdapter = prestationAdapter;
    }

    async create(appointmentRequestDto,customerId) {
        await this.checkIfPrestationsExist(appointmentRequestDto.prestationIds);
        await this.checkIfVehicleExists(appointmentRequestDto.vehicleId,customerId);
        
        const newAppointment = appointmentRequestDto.toAppointmentModel();
        newAppointment.setCustomerId(customerId);
        newAppointment.setStatus(AppointmentStatus.SCHEDULED);
        const savedAppointment =  await this.appointmentAdapter.create(newAppointment);
        return new AppointmentRetrieveOneResponseDto(savedAppointment);
    }

    async checkIfVehicleExists(vehicleId, customerId) {
        const vehicle = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId, customerId);
        if (!vehicle) {
            throw new CustomError("Vehicle not found for the customer "+customerId, 404);
        }
    }

    async checkIfPrestationsExist(prestationIds) {
        if(!prestationIds || prestationIds.length === 0){
            throw new CustomError("Prestations must be provided", 500);
        }
        const prestationsFromDb = await this.prestationAdapter.findByIds(prestationIds);
        const prestationNotfound = [];
        
        for(const prestationId of prestationIds){
            if(!prestationsFromDb.find(prestation => prestation.id == prestationId)){
                prestationNotfound.push(prestationId);
            }
        }
        
        if(prestationNotfound.length > 0){
            throw new CustomError("Prestations not found: "+prestationNotfound.join(", "), 404);
        }
    }
}

module.exports = AppointmentCreateUseCase;