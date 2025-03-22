const VehicleType = require("../enumeration/VehicleType");
const Transmission = require("../enumeration/Transmission");
const CustomError = require("../../error/CustomError");
const Sizing = require("../../constant/Sizing");

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
            const requiredFields = errorMessages.join(", ");
            throw new CustomError(`The following fields are required: ${requiredFields}`,500);
        }
        
    }

    static expectThatVehiclePictureSizeIsValid(picture){
        if(Buffer.byteLength(picture, 'base64') < Sizing.IMAGE_SIZE){
            throw new CustomError(`Picture must be less than 5MB`,500);
        }
    }

    static expectThatVehicleTypeIsValid(vehicleType){
        console.log(vehicleType)
        const vehicleTypes = Object.values(VehicleType);
        if(!vehicleTypes.includes(vehicleType)) {
            throw new CustomError(`Vehicule type ${vehicleType} does not exist`,500);
        }
    }

    static expectThatTransmissionIsValid(transmission){
        console.log(transmission)
        const transmissions = Object.values(Transmission);
        if(!transmissions.includes(transmission)) {
            throw new CustomError(`Transmission ${transmission} does not exist`,500);
        }
    }
}

module.exports = UserService;