const Scope = require("../../../constant/Scope");
const AppointmentStatus = require("../../enumeration/AppointmentStatus");
const CustomError = require("../../../error/CustomError");
const AppointmentRetrieveOneResponseDto = require("../../../dto/appointment/AppointmentRetrieveOneResponseDto");

class AppointmentUpdateUseCase{
    constructor(appointmentAdapter) {
        this.appointmentAdapter = appointmentAdapter;
    }

    async cancelAppointment(customerId,appointmentId){
        const appointmentFromDb = await  this.appointmentAdapter.findByIdAndCustomerId(appointmentId,customerId,Scope.BASIC);
        
        this.checkIfAppointmentExists(appointmentFromDb);
        this.checkIfAppointmentIsNotCancelled(appointmentFromDb);

        const updateData = { status: AppointmentStatus.CANCELED};
        await this.appointmentAdapter.update(appointmentId,updateData);
        const updatedAppointment = await this.appointmentAdapter.findByIdAndCustomerId(appointmentId,customerId);

        return new AppointmentRetrieveOneResponseDto(updatedAppointment);
    }


    checkIfAppointmentExists(appointment) {
        if(!appointment) {
            throw new CustomError("Appointment not found",404);
        }
    }

    checkIfAppointmentIsNotCancelled(appointment) {
        if(appointment.status === AppointmentStatus.CANCELED) {
            throw new CustomError("Appointment is already cancelled",400);
        }
    }
}

module.exports = AppointmentUpdateUseCase;