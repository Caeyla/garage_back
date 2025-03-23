const VehicleRetrieveOneResponseDto = require("../../../dto/vehicle/VehicleRetrieveOneResponseDto");
const VehicleRetrieveManyResponseDto = require("../../../dto/vehicle/VehicleRetrieveManyResponseDto");
const CustomError = require("../../../error/CustomError");
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
        if(!vehicle){
            throw new CustomError("Vehicle not found",404);
        }
        return new VehicleRetrieveOneResponseDto(vehicle);
    }
}

module.exports = VehicleRetrieveUseCase;