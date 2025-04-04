class Appointment {
    constructor(id,customerId,vehicleId,prestationId ,appointmentDate,status,numAppointment,mechanicId,endDate) {
        this.numAppointment = numAppointment;
        this.id = id;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.prestationId = prestationId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.mechanicId = mechanicId;
        this.endDate = endDate;
    }

    setStatus(status) { this.status = status;}
    setCustomerId(customerId) { this.customerId = customerId; }
    setMechanicId(mechanicId) { this.mechanicId = mechanicId; }
    setEndDate(endDate) { this.endDate = endDate; }
    static get Builder() {
        class Builder {
            constructor() {
                this.vehicleId = null;
                this.customerId = null;
                this.prestationId = null;
                this.appointmentDate = null;
                this.id = null;
                this.status = null;
                this.numAppointment = null;
                this.mechanicId = null;
                this.endDate = null;
            }
            
            setId(id) { this.id = id; return this; }
            setCustomerId(customerId) { this.customerId = customerId; return this; }
            setVehicleId(vehicleId) { this.vehicleId = vehicleId; return this; }
            setPrestationId(prestationId) { this.prestationId = prestationId; return this; }
            setAppointmentDate(appointmentDate) { this.appointmentDate = appointmentDate; return this; }
            setStatus(status) { this.status = status; return this; }
            setNumAppointment(numAppointment) { this.numAppointment = numAppointment; return this; }
            setMechanicId(mechanicId) { this.mechanicId = mechanicId; return this; }
            setEndDate(endDate) { this.endDate = endDate; return this; }
            build() {
                return new Appointment(
                    this.id,
                    this.customerId,
                    this.vehicleId,
                    this.prestationId,
                    this.appointmentDate,
                    this.status,
                    this.numAppointment,
                    this.mechanicId,
                    this.endDate
                );
            }
        }
        return Builder;
    }
}

module.exports = Appointment;