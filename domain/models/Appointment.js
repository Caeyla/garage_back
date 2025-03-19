class Appointment {
    constructor(id,customerId,vehicleId,prestationIds ,appointmentDate,status) {
        this.id = id;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.prestationIds = prestationIds;
        this.appointmentDate = appointmentDate;
        this.status = status;
    }

    setStatus(status) { this.status = status;}
    setCustomerId(customerId) { this.customerId = customerId; }
    static get Builder() {
        class Builder {
            constructor() {
                this.vehicleId = null;
                this.customerId = null;
                this.prestationIds = [];
                this.appointmentDate = null;
                this.id = null;
                this.status = null;
            }
            
            setId(id) { this.id = id; return this; }
            setCustomerId(customerId) { this.customerId = customerId; return this; }
            setVehicleId(vehicleId) { this.vehicleId = vehicleId; return this; }
            setPrestationIds(prestationIds) { this.prestationIds = prestationIds; return this; }
            setAppointmentDate(appointmentDate) { this.appointmentDate = appointmentDate; return this; }
            setStatus(status) { this.status = status; return this; }
            build() {
                return new Appointment(
                    this.id,
                    this.customerId,
                    this.vehicleId,
                    this.prestationIds,
                    this.appointmentDate,
                    this.status
                );
            }
        }
        return Builder;
    }
}

module.exports = Appointment;