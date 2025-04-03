class UnavailableDateRetrieveOneResponseDto{
    constructor({_id,motif,description,startDate,endDate}){
        this.id = _id;
        this.motif = motif;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

class UnavailableDateRetrieveManyResponseDto{
    constructor(unavailableDates = []){
        this.unavailableDates = unavailableDates.map(unavailableDate => new UnavailableDateRetrieveOneResponseDto(unavailableDate));
    }
}

module.exports = {UnavailableDateRetrieveOneResponseDto,UnavailableDateRetrieveManyResponseDto};