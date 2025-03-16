const Vehicle = require("../../domain/models/Vehicle")
class VehicleRetrieveOneResponseDto {
    constructor({_id,brand,model,registrationNumber,transmission,kilometers,type,yearOfManufacture,customerId}) {
        this.id = _id;
        this.brand = brand;
        this.model = model;
        this.registrationNumber = registrationNumber;
        this.transmission = transmission;
        this.kilometers = kilometers;
        this.type = type; 
        this.yearOfManufacture = yearOfManufacture;
        this.customerId = customerId
    }
    
}

module.exports = VehicleRetrieveOneResponseDto