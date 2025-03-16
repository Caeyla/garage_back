const CustomError = require("../../../error/CustomError");
const VehicleService = require("../../services/VehicleService");
class VehicleUpdateUseCase {
    constructor(vehicleAdapter,customerAdapter) {
        this.vehicleAdapter = vehicleAdapter;
        this.customerAdapter = customerAdapter;
    }

    async update(customerId,vehicleId,vehicleRequestDto) {
        const vehicleUpdateData = vehicleRequestDto.toVehicleModel();
        const vehicleFromDb = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId,customerId);
        if(!vehicleFromDb){
            throw new CustomError("Vehicle not found",404);
        }
        
        const finalUpdateData = this.getFinalUpdateData(vehicleFromDb,vehicleUpdateData);
        return await this.vehicleAdapter.update(vehicleId,finalUpdateData);
    }

    getFinalUpdateData(vehicleFromDb,vehicleUpdateData){

        return {
            brand: vehicleUpdateData.brand || vehicleFromDb.brand,
            model: vehicleUpdateData.model || vehicleFromDb.model,
            kilometers: vehicleUpdateData.kilometers || vehicleFromDb.kilometers,
            transmission: vehicleUpdateData.transmission || vehicleFromDb.transmission,
            yearOfManufacture: vehicleUpdateData.yearOfManufacture || vehicleFromDb.yearOfManufacture
        }
    }

}

module.exports = VehicleUpdateUseCase;