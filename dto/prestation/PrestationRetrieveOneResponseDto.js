class PrestationRetrieveOneResponseDto {
    constructor({_id,name,description, price, duration }) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
    }
}

module.exports = PrestationRetrieveOneResponseDto;