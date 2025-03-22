const PrestationRetrieveOneResponseDto = require('./PrestationRetrieveOneResponseDto');
class PrestationRetrieveManyResponseDto {
    constructor(prestations) {
        this.prestations = this.convertToResponseDto(prestations);
    }

    convertToResponseDto(prestations) {
        const prestationDtos = [];
        for(let i = 0; i < prestations.length; i++){
            prestationDtos[i] = new PrestationRetrieveOneResponseDto(prestations[i]);
        }
        return prestationDtos;
    }
}

module.exports = PrestationRetrieveManyResponseDto;