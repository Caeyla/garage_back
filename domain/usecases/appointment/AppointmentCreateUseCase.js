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
        await this.checkIfPrestationExists(appointmentRequestDto.prestationId);
        await this.checkIfVehicleExists(appointmentRequestDto.vehicleId,customerId);
        await this.expectThatDurationMeetsRequirements(appointmentRequestDto.prestationId);
        this.exceptThatAppointmentDateIsValid(appointmentRequestDto.appointmentDate);
        const assignedMechanic = await this.getMechanic(appointmentRequestDto.prestationId);
        
        const newAppointment = appointmentRequestDto.toAppointmentModel();
        newAppointment.setCustomerId(customerId);
        newAppointment.setStatus(AppointmentStatus.SCHEDULED);
        newAppointment.setMechanicId(assignedMechanic.id);
        
        const savedAppointment =  await this.appointmentAdapter.create(newAppointment);
        return new AppointmentRetrieveOneResponseDto(savedAppointment);
    }

    async expectThatDurationMeetsRequirements(prestationId) {
        // TODO implement this method
    }

    async exceptThatDurationMeetsRequirements(prestationId) {
        // TODO implement this method
    }
    async checkIfVehicleExists(vehicleId, customerId) {
        const vehicle = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId, customerId);
        if (!vehicle) {
            throw new CustomError("Vehicle not found for the customer "+customerId, 404);
        }
    }

    async checkIfPrestationExists(prestationId) {
        if(!prestationId){
            throw new CustomError("Prestations must be provided", 500);
        }
        const prestationFromDb = await this.prestationAdapter.findById(prestationId);
        
        if (!prestationFromDb) {
            throw new CustomError("Prestation not found "+ prestationId, 404);
        }
    }

    exceptThatAppointmentDateIsValid(appointmentDateAsString){
        if(!appointmentDateAsString){
            throw new CustomError("Appointment date must be provided", 500);
        }
        const appointmentDate = new Date(appointmentDateAsString);
        const now = new Date();
        if(appointmentDate.getTime() < now.getTime()){
            throw new CustomError("Appointment date must be in the future", 500);
        }
    }
}

module.exports = AppointmentCreateUseCase;