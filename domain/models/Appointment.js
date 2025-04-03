class Appointment {
    constructor(id,customerId,vehicleId,prestationId ,appointmentDate,status,numAppointment,mechanicId) {
        this.numAppointment = numAppointment;
        this.id = id;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.prestationId = prestationId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.mechanicId = mechanicId;
    }

    setStatus(status) { this.status = status;}
    setCustomerId(customerId) { this.customerId = customerId; }
    setMechanicId(mechanicId) { this.mechanicId = mechanicId; }
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
            }
            
            setId(id) { this.id = id; return this; }
            setCustomerId(customerId) { this.customerId = customerId; return this; }
            setVehicleId(vehicleId) { this.vehicleId = vehicleId; return this; }
            setPrestationId(prestationId) { this.prestationId = prestationId; return this; }
            setAppointmentDate(appointmentDate) { this.appointmentDate = appointmentDate; return this; }
            setStatus(status) { this.status = status; return this; }
            setNumAppointment(numAppointment) { this.numAppointment = numAppointment; return this; }
            setMechanicId(mechanicId) { this.mechanicId = mechanicId; return this; }
            build() {
                return new Appointment(
                    this.id,
                    this.customerId,
                    this.vehicleId,
                    this.prestationId,
                    this.appointmentDate,
                    this.status,
                    this.numAppointment,
                    this.mechanicId
                );
            }
        }
        return Builder;
    }
}

module.exports = Appointment;