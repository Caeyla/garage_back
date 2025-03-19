class PrestationRetrieveOneResponseDto {
    constructor({_id, name, description, price}) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

module.exports = PrestationRetrieveOneResponseDto;