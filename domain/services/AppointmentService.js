const CustomError = require('../../error/CustomError');
class AppointmentService {
    static async  checkIfPrestationExists(prestationAdapter,prestationId) {
        if(!prestationId){
            throw new CustomError("Prestations must be provided", 500);
        }
        const prestationFromDb = await prestationAdapter.findById(prestationId);
        
        if (!prestationFromDb) {
            throw new CustomError("Prestation not found "+ prestationId, 404);
        }
    }

    static exceptThatAppointmentDateIsValid(appointmentDateAsString){
        if(!appointmentDateAsString){
            throw new CustomError("Appointment date must be provided", 500);
        }
        const appointmentDate = new Date(appointmentDateAsString);
        const now = new Date();
        if(appointmentDate.getTime() < now.getTime()){
            throw new CustomError("Appointment date must be in the future", 500);
        }
    }

    static async checkIfVehicleExists(vehicleAdapter,vehicleId, customerId) {
        const vehicle = await vehicleAdapter.findByIdAndCustomerId(vehicleId, customerId);
        if (!vehicle) {
            throw new CustomError("Vehicle not found for the customer "+customerId, 404);
        }
    }

    static expectThatIntervalIsInWorkingHours(interval) {
        const startTime = interval.start.getTime();
        const endTime = interval.end.getTime();
        const now = new Date().getTime();
        if (startTime < now || endTime < now) {
            throw new CustomError("Interval must be in the future", 500);
        }
    }

}

module.exports = AppointmentService