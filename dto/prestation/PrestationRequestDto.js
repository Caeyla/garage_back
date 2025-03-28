class PrestationRequestDto{
    constructor(data){
        this.name = data.name;
        this.description = data.description || "";
        this.price = data.price;
        this.duration = data.duration;
        this.specialities = data.specialities || [];
    }
}

module.exports = PrestationRequestDto;