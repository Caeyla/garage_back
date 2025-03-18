class Appointment {
    constructor(id,vehicleId, prestationIds ,appointmentDate) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.prestationIds = prestationIds;
        this.appointmentDate = appointmentDate;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.vehicleId = null;
                this.prestationIds = [];
                this.appointmentDate = null;
                this.id = null;
            }
            
            setId(id) { this.id = id; return this; }
            setVehicleId(vehicleId) { this.vehicleId = vehicleId; return this; }
            setPrestationIds(prestationIds) { this.prestationIds = prestationIds; return this; }
            setAppointmentDate(appointmentDate) { this.appointmentDate = appointmentDate; return this; }
    
            build() {
                return new Appointment(
                    this.id,
                    this.vehicleId,
                    this.prestationIds,
                    this.appointmentDate
                );
            }
        }
        return Builder;
    }
}

module.exports = Appointment;