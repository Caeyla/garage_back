const  ChargeRetrieveManyDto  = require('../../../dto/charge/ChargeRetrieveManyDto');
const  ChargeRetrieveOneDto  = require('../../../dto/charge/ChargeRetrieveOneDto');
const  CustomError  = require('../../../error/CustomError');
class ChargeUseCase {
    constructor(chargeAdapter) {
        this.chargeAdapter = chargeAdapter;
    }

    async createCharge({name, details = []}) {
        const createdCharge = await this.chargeAdapter.create({name});
        for(const detail of details) {
            await this.addChargeDetail(createdCharge._id,detail);
        }
        const createdChargeWithDetails = await this.chargeAdapter.findById(createdCharge._id);
        return new ChargeRetrieveOneDto(createdChargeWithDetails);
    }   

    async updateCharge(chargeId,updatesToCharge) {
        await this.checkIfChargeExists(chargeId);
        if(updatesToCharge.name) {
            await this.chargeAdapter.updateName(chargeId,updatesToCharge.name);
        }
        if(updatesToCharge.details) {
            for(const detail of updatesToCharge.details) {
                await this.addChargeDetail(chargeId,detail);
            }
        }
        const updatedCharge = await this.chargeAdapter.findById(chargeId);
        return new ChargeRetrieveOneDto(updatedCharge);
    }

    async addChargeDetail(chargeId,{date,amount,description}) {
        this.expectThatAmountIsGreaterThanZero(amount);
        this.expectThatDateIsValid(date);
        await this.chargeAdapter.addDetailsUsingChargeId({chargeId,date,amount,description});
    }

    async checkIfChargeExists(chargeId) {
        const charge = await this.chargeAdapter.findById(chargeId);
        if(!charge) {
            throw new CustomError("Charge not found",404);
        }
    }

    expectThatDateIsValid(date) {
        if(!date) {
            throw new CustomError("Date must be provided",400);
        }
    }

    expectThatAmountIsGreaterThanZero(amount) {
        if(amount <= 0) {
            throw new CustomError("Amount must be greater than zero",400);
        }
    }

    async findAll() {
        const charges = await this.chargeAdapter.findAll();
        return new ChargeRetrieveManyDto(charges);
    }

    async findById(id) {
        const charge = await this.chargeAdapter.findById(id);
        if(!charge) {
            throw new CustomError("Charge not found",404);
        }
        return new ChargeRetrieveOneDto(charge);
    }
}

module.exports = ChargeUseCase;