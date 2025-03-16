const VehicleType = require("../enumeration/VehicleType");
const Transmission = require("../enumeration/Transmission");

class UserService {
    static expectThatRequiredFieldsArePresent(vehicle) {
        console.log(vehicle);
        const  errorMessages = [];  
        if(!vehicle.brand){errorMessages.push("brand")}
        if(!vehicle.model){errorMessages.push("model")}
        if(!vehicle.registrationNumber){errorMessages.push("registrationNumber")}
        if(!vehicle.kilometers){errorMessages.push("kilometers")}
        if(!vehicle.transmission){errorMessages.push("transmission")}
        if(!vehicle.typeVehicle){errorMessages.push("typeVehicle")}
        if(!vehicle.yearOfManufacture){errorMessages.push("yearOfManufacture")}

        if(errorMessages.length > 0){
            throw new Error(errorMessages.join(", "));
        }
        
    }

    static expectThatVehicleTypeIsValid(vehicleType){
        console.log(vehicleType)
        const vehicleTypes = Object.values(VehicleType);
        if(!vehicleTypes.includes(vehicleType)) {
            throw new Error(`Vehicule type ${vehicleType} does not exist`);
        }
    }

    static expectThatTransmissionIsValid(transmission){
        console.log(transmission)
        const transmissions = Object.values(Transmission);
        if(!transmissions.includes(transmission)) {
            throw new Error(`Transmission ${transmission} does not exist`);
        }
    }
}

module.exports = UserService;