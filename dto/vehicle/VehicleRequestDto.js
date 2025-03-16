const Vehicle = require("../../domain/models/Vehicle")
class VehicleRequestDto {
    constructor({brand,model,registrationNumber,transmission,kilometers,type,yearOfManufacture}) {
        this.brand = brand;
        this.model = model;
        this.registrationNumber = registrationNumber;
        this.transmission = transmission;
        this.kilometers = kilometers;
        this.typeVehicle = type; 
        this.yearOfManufacture = yearOfManufacture;
    }

    toVehicleModel(){
        return new Vehicle.Builder()
            .setRegistrationNumber(this.registrationNumber)
            .setTypeVehicle(this.typeVehicle)
            .setBrand(this.brand)
            .setModel(this.model)
            .setKilometers(this.kilometers)
            .setYearOfManufacture(this.yearOfManufacture)
            .setTransmission(this.transmission)
            .build()
    }
    
}

module.exports = VehicleRequestDto