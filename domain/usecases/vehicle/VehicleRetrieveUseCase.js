const VehicleRetrieveOneResponseDto = require("../../../dto/vehicle/VehicleRetrieveOneResponseDto");
const VehicleRetrieveManyResponseDto = require("../../../dto/vehicle/VehicleRetrieveManyResponseDto");

class VehicleRetrieveUseCase{
    constructor(vehicleAdapter,customerAdapter){
        this.vehicleAdapter = vehicleAdapter;
        this.customerAdapter = customerAdapter;
    }

    async retrieveByCustomerId(customerId){
        const vehicles = await this.vehicleAdapter.findByCustomerId(customerId);
        return new VehicleRetrieveManyResponseDto(vehicles);
    }

    async retrieveByIdAndCustomerId(vehicleId,customerId){
        const vehicle = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId,customerId);
        return new VehicleRetrieveOneResponseDto(vehicle);
    }
}

module.exports = VehicleRetrieveUseCase;