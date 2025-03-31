class AppointmentProviderUseCase {
    constructor(appointmentAdapter,prestationAdapter,employeeAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async retrieveMechanicsBySpeciality(specialityId){
        const mechanicList = await this.appointmentAdapter.retriveMechanicsBySpeciality(specialityId);
        return mechanicList;
    }

    async provideFirstUnavailability(mechanic){
        const unavailability = [];
        unavailability.push.apply(unavailability, mechanic.getUnavailableDates());
    }

    getAppointmentDates(mechanicId,currentDate){
        const appointmentDates = this.appointmentAdapter.getMechanicAppointmentAfterThisDate(mechanicId,currentDate);

        return appointmentDates;
    }
}