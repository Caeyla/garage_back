const SpecialityRetrieveOneResponseDto = require('./SpecialityRetrieveOneResponseDto');
class SpecialityRetrieveManyResponseDto {
    constructor(specialities) {
        this.specialities = this.convertToResponseDto(specialities);
    }

    convertToResponseDto(specialities) {
        const specialityDtos = [];
        for(let i = 0; i < specialities.length; i++){
            specialityDtos[i] = new SpecialityRetrieveOneResponseDto(specialities[i]);
        }
        return specialityDtos;
    }
}

module.exports = SpecialityRetrieveManyResponseDto;