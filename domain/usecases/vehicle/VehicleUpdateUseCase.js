const CustomError = require("../../../error/CustomError");
const VehicleRetrieveOneResponseDto = require("../../../dto/vehicle/VehicleRetrieveOneResponseDto");
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
        await this.vehicleAdapter.update(vehicleId,finalUpdateData);
        const updatedVehicle = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId,customerId);
        return new VehicleRetrieveOneResponseDto(updatedVehicle);
    }

    async remove(customerId,vehicleId) {
        const vehicleFromDb = await this.vehicleAdapter.findByIdAndCustomerId(vehicleId,customerId);
        if(!vehicleFromDb){
            throw new CustomError("Vehicle not found",404);
        }
        const updateData = { isActive: false };
        await this.vehicleAdapter.update(vehicleId,updateData);
        return { registrationNumber: vehicleFromDb.registrationNumber};
    }

    getFinalUpdateData(vehicleFromDb,vehicleUpdateData){

        return {
            brand: vehicleUpdateData.brand || vehicleFromDb.brand,
            model: vehicleUpdateData.model || vehicleFromDb.model,
            kilometers: vehicleUpdateData.kilometers || vehicleFromDb.kilometers,
            transmission: vehicleUpdateData.transmission || vehicleFromDb.transmission,
            yearOfManufacture: vehicleUpdateData.yearOfManufacture || vehicleFromDb.yearOfManufacture,
            picture: vehicleUpdateData.picture || vehicleFromDb.picture
        }
    }

}

module.exports = VehicleUpdateUseCase;