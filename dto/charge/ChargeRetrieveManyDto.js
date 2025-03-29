const ChargeRetrieveOneDto = require('./ChargeRetrieveOneDto');
class ChargeRetrieveManyDto {
    constructor(charges) {
        this.charges = charges.map(charge => new ChargeRetrieveOneDto(charge));
    }
}

module.exports = ChargeRetrieveManyDto;