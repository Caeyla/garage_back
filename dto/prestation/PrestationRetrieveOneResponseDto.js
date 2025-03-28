class PrestationRetrieveOneResponseDto {
    constructor({_id,name,description, price, duration, specialities}) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.specialities = specialities;
    }
}

module.exports = PrestationRetrieveOneResponseDto;