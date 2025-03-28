class AppointmentProviderUseCase {
    constructor(appointmentAdapter,prestationAdapter,employeeAdapter) {
        this.appointmentAdapter = appointmentAdapter;
        this.employeeAdapter = employeeAdapter;
    }

    async retrieveMechanicsBySpeciality(specialityId){
        const mechanicList = await this.appointmentAdapter.retriveMechanicsBySpeciality(specialityId);

        return mechanicList;
    }

    getUnavailableDates(mechanic){
        const addUnvailableDates = mechanic.getUnavailableDates();
        return addUnvailableDates;
    }

    getAppointmentDates(mechanicId,currentDate){
        const appointmentDates = this.appointmentAdapter.getMechanicAppointmentAfterThisDate(mechanicId,currentDate);

        return appointmentDates;
    }
}