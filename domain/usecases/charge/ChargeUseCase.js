const  ChargeRetrieveManyDto  = require('../../../dto/charge/ChargeRetrieveManyDto');
const  ChargeRetrieveOneDto  = require('../../../dto/charge/ChargeRetrieveOneDto');
const  CustomError  = require('../../../error/CustomError');
class ChargeUseCase {
    constructor(chargeAdapter) {
        this.chargeAdapter = chargeAdapter;
    }

    async createCharge({name}) {
        const createdCharge = await this.chargeAdapter.create({name});
        return new ChargeRetrieveOneDto(createdCharge);
    }   
    async addChargeDetail(chargeId,{date,amount,description}) {
        this.expectThatAmountIsGreaterThanZero(amount);
        this.expectThatDateIsValid(date);
        await this.checkIfChargeExists(chargeId);
        const updatedCharge = await this.chargeAdapter.addDetailsUsingChargeId({chargeId,date,amount,description});
        console.log(updatedCharge);
        return new ChargeRetrieveOneDto(updatedCharge);
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