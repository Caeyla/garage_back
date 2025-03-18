const CustomError = require("../../../error/CustomError");
const VehicleService = require("../../services/VehicleService");
const VehicleRetrieveOneResponseDto = require("../../../dto/vehicle/VehicleRetrieveOneResponseDto");
class VehicleCreateUseCase {
    constructor(vehicleAdapter,customerAdapter) {
        this.vehicleAdapter = vehicleAdapter;
        this.customerAdapter = customerAdapter;
    }

    async create(customerId,vehicleRequestDto) {
        await this.expectThatCustomerExist(customerId);
        const vehicle = vehicleRequestDto.toVehicleModel();
        VehicleService.expectThatRequiredFieldsArePresent(vehicle)
        VehicleService.expectThatVehicleTypeIsValid(vehicle.typeVehicle);
        VehicleService.expectThatTransmissionIsValid(vehicle.transmission);

        const createdVehicle = await this.vehicleAdapter.create(customerId,vehicle);
        return new VehicleRetrieveOneResponseDto(createdVehicle);
    }

    async expectThatCustomerExist(customerId){
        if(!customerId){
            throw new CustomError("Customer Id required to perform this action",500)
        }
        const customer = await this.customerAdapter.findById(customerId);
        if(!customer){
            throw new CustomError("Customer not found ",404);
        }
    }
    
    expectThatKilometersIsGreaterThanZero(kilometers){
        if(kilometers < 0){
            throw new CustomError("Kilometers must me greater than zero",500)
        }
    }
}

module.exports = VehicleCreateUseCase;