const PrestationRetrieveOneResponseDto = require('./PrestationRetrieveOneResponseDto');
class PrestationRetrieveManyResponseDto {
    constructor(prestations) {
        this.prestations = this.convertToResponseDto(prestations);
    }

    convertToResponseDto(prestations) {
        for(let i = 0; i < prestations.length; i++){
            prestations[i] = new PrestationRetrieveOneResponseDto(prestations[i]);
        }
        return prestations;
    }
}

module.exports = PrestationRetrieveManyResponseDto;