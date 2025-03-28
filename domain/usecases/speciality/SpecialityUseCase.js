class SpecialityUseCase{
    constructor(specialityAdapter){
        this.specialityAdapter = specialityAdapter;
    }

    async create({name}) {
        const newSpeciality = await this.specialityAdapter.create({name});
        return newSpeciality;
    }

    async retrieveAll() {
        const specialities = await this.specialityAdapter.findAll();
        return specialities;
    }

    async retrieveById(id) {
        const speciality = await this.specialityAdapter.findById(id);
        return speciality;
    }
}

module.exports = SpecialityUseCase;