
const AppointmentRetrieveOneResponseDto = require('../../../dto/appointment/AppointmentRetrieveOneResponseDto');
const AppointmentStatus = require('../../enumeration/AppointmentStatus');
const AppointmentService = require('../../services/AppointmentService');
const DateTimeInterval = require('../../models/DateTimeInterval');
const ScheduleService = require('../../services/ScheduleService');
const CustomError = require('../../../error/CustomError');
class AppointmentCreateUseCase {
    constructor(appointmentAdapter,vehicleAdapter,prestationAdapter,employeeAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.vehicleAdapter = vehicleAdapter;
        this.prestationAdapter = prestationAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async create(appointmentRequestDto,customerId) {
        await AppointmentService.checkIfPrestationExists(this.prestationAdapter,appointmentRequestDto.prestationId);
        await AppointmentService.checkIfVehicleExists(this.vehicleAdapter,appointmentRequestDto.vehicleId,customerId);
        AppointmentService.exceptThatAppointmentDateIsValid(appointmentRequestDto.appointmentDate);

        const prestation = await this.prestationAdapter.findById(appointmentRequestDto.prestationId);
        const intervalAppointment = this.buildInterval(appointmentRequestDto.appointmentDate,prestation.duration);
        ScheduleService.expectThatDateIsInDailyOpeningHours(intervalAppointment);
        
        const assignedMechanic = await this.getMechanicToAssign(prestation._id,intervalAppointment);
        
        const newAppointment = appointmentRequestDto.toAppointmentModel();
        newAppointment.setCustomerId(customerId);
        newAppointment.setStatus(AppointmentStatus.SCHEDULED);
        newAppointment.setEndDate(intervalAppointment.endDate);
        newAppointment.setMechanicId(assignedMechanic.id);

        const savedAppointment =  await this.appointmentAdapter.create(newAppointment);
        return new AppointmentRetrieveOneResponseDto(savedAppointment);
    }

    buildInterval(appointmentDateAsString,duration) {
        const appointmentDate = new Date(appointmentDateAsString);
        const endDate = new Date(appointmentDate.getTime() + duration * 60 * 60 * 1000);
        return new DateTimeInterval(appointmentDate,endDate);
    }

    async getMechanicToAssign(prestationId,intervalAppointment) {
        const mechanics = await this.employeeAdapter.retrieveMechanicsByPrestationId(prestationId);
        if(mechanics.length === 0) {
            throw new CustomError("No mechanic have this prestation", 404);
        }
        for(let i=0; i<mechanics.length; i++){
            const unavailabilitiesOfMecha = await this.buildUnavailabilityArray(mechanics[i]);
            const oneIntervalIntersections = this.getIntersectionWithUnavailabilities(intervalAppointment,unavailabilitiesOfMecha);
            if(oneIntervalIntersections.length === 0) {
                return mechanics[i];
            }
        }
        throw new CustomError("No Mechanic available", 500);
    }

    async buildUnavailabilityArray(mecha) {
        const unavailabilityArray = [];
        for (const date of mecha.unavailableDates) {
            unavailabilityArray.push(new DateTimeInterval(date.startDate, date.endDate));
        }
        const retrievedAppointments = await this.appointmentAdapter.retrieveAppointmentsByMechanicId(mecha.id);
        const mechaAppointments =  retrievedAppointments.map(appointment => new DateTimeInterval(appointment.appointmentDate, appointment.endDate));
    
        unavailabilityArray.push(...mechaAppointments);
        return unavailabilityArray;
    }

    getIntersectionWithUnavailabilities(appointmentDate,unavailabilitiesOfMecha){
        const oneIntervalIntersections = [];
        for(let j=0; j<unavailabilitiesOfMecha.length; j++){
            const intersection = appointmentDate.getIntersectionInterval(unavailabilitiesOfMecha[j]);
            if(intersection){
                oneIntervalIntersections.push(intersection);
            }
        }
        return oneIntervalIntersections;
    }
}

module.exports = AppointmentCreateUseCase;