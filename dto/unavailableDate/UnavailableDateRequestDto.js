class UnavailableDateRequestDto{
    constructor({motif,description,startDate,endDate}){
        this.motif = motif;
        this.description = description;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }
}
module.exports = UnavailableDateRequestDto;