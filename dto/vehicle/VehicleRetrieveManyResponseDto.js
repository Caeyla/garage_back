const VehicleRetrieveOneResponseDto = require("./VehicleRetrieveOneResponseDto");

class VehicleRetrieveManyResponseDto {
    constructor(vehicles) {
        this.vehicles = this.convertToResponseDto(vehicles);
    }

    convertToResponseDto(vehicles) { 
        for(let i = 0; i < vehicles.length; i++){
            vehicles[i] = new VehicleRetrieveOneResponseDto(vehicles[i]);
        }
        return vehicles;
    }
}

module.exports = VehicleRetrieveManyResponseDto