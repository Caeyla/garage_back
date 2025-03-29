const SpecialityRetrieveOneResponseDto = require("../../../dto/speciality/SpecialityRetrieveOneResponseDto");
const SpecialityRetrieveManyResponseDto = require("../../../dto/speciality/SpecialityRetrieveManyResponseDto");
class SpecialityUseCase{
    constructor(specialityAdapter){
        this.specialityAdapter = specialityAdapter;
    }

    async create({name}) {
        const newSpeciality = await this.specialityAdapter.create({name});
        return new SpecialityRetrieveOneResponseDto(newSpeciality);
    }

    async retrieveAll() {
        const specialities = await this.specialityAdapter.findAll();
        return new SpecialityRetrieveManyResponseDto(specialities);
    }

    async retrieveById(id) {
        const speciality = await this.specialityAdapter.findById(id);
        return new SpecialityRetrieveOneResponseDto(speciality);
    }
}

module.exports = SpecialityUseCase;