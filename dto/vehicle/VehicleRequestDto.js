const Vehicle = require("../../domain/models/Vehicle")
class VehicleRequestDto {
    constructor({brand,model,registrationNumber,transmission,kilometers,type,yearOfManufacture,picture}) {
        this.brand = brand;
        this.model = model;
        this.registrationNumber = registrationNumber;
        this.transmission = transmission;
        this.kilometers = kilometers;
        this.typeVehicle = type; 
        this.yearOfManufacture = yearOfManufacture;
        this.picture = picture
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
            .setPicture(this.picture)
            .build()
    }
    
}

module.exports = VehicleRequestDto