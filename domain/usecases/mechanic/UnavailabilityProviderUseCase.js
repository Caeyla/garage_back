const DateTimeInterval = require("../../models/DateTimeInterval");
const CustomError = require("../../../error/CustomError");
class UnavailabilityProviderUseCase {
    constructor(appointmentAdapter,employeeAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async getUnavailableDates(prestationId) {
        const mechaFinds = await this.getMechaByPrestation(prestationId);
        let unavailabilities = this.buildUnavailabilityArray(mechaFinds[0]);
        for(let i=1; i<mechaFinds.length; i++){
           unavailabilities = this.getunavailabilitiesForMecha(unavailabilities,mechaFinds[i]);
        }
        return unavailabilities;
    }
    
    async getMechaByPrestation(prestationId) {
        let mechas = await this.employeeAdapter.retrieveMechanicsByPrestationId(prestationId);
        if(mechas.length === 0) {
            throw new CustomError("No mechanic found for this prestation", 404);
        }
        return mechas;
    }

    async buildUnavailabilityArray(mecha) {
        const unavailabilityArray = [];
        for (const date of mecha.unvailableDates) {
            unavailabilityArray.push(new DateTimeInterval(date));
        }
        const retrievedAppointments = await this.appointmentAdapter.retrieveAppointmentsByMechanicId(mecha.id);
        const mechaAppointments =  retrievedAppointments.map(appointment => new DateTimeInterval(appointment.startDate, appointment.endDate));
    
        unavailabilityArray.push(...mechaAppointments);
        return unavailabilityArray;
    }
    
    getunavailabilitiesForMecha(unavailabilities,mecha){
        const unavailabilitiesOfMecha = buildUnavailabilityArray(mecha);
        let intersections = this.getIntersectionIntervals(unavailabilities,unavailabilitiesOfMecha);
        return intersections;
    }
    
    getIntersectionIntervals(unavailabilities,unavailabilitiesOfMecha){
        const intersections = [];
        for(let i=0; i<unavailabilities.length; i++){
            intersections.push(...this.getIntersectionForOneInterval(unavailabilities[i],unavailabilitiesOfMecha));
        }
        return intersections;
    }
    
    getIntersectionForOneInterval(unavailability,unavailabilitiesOfMecha){
        const oneIntervalIntersections = [];
        for(let j=0; j<unavailabilitiesOfMecha.length; j++){
            const intersection = unavailability.getIntersectionInterval(unavailabilitiesOfMecha[j]);
            if(intersection){
                oneIntervalIntersections.push(intersection);
            }
        }
        return oneIntervalIntersections;
    }
}

module.exports = UnavailabilityProviderUseCase;