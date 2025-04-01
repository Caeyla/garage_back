
class UnavailabilityProviderUseCase {
    constructor(appointmentAdapter,employeeAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    getUnavailableDates(speciality) {
        const mechaFinds = getMechaBySpeciality(speciality);
        let unavailabilities = buildUnavailabilityArray(mechaFinds[0]);
        for(let i=1; i<mechaFinds.length; i++){
           unavailabilities = this.getunavailabilitiesForMecha(unavailabilities,mechaFinds[i]);
        }
        return unavailabilities;
    }
    
    getMechaBySpeciality(specialityId) {
        return this.employeeAdapter.retriveMechanicsBySpeciality(specialityId);
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