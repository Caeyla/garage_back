class ChargeRetrieveOneDto {
    constructor({ _id, name,details}) {
        this.id = _id;
        this.name = name;
        this.details = details.map(detail => new ChargeDetailsRetrieveDto(detail));
    }
}

class ChargeDetailsRetrieveDto {
    constructor({ _id, date, amount ,description}) {
        this.date = date;
        this.amount = amount;
        this.description = description;
    }
}

module.exports = ChargeRetrieveOneDto;