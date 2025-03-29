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