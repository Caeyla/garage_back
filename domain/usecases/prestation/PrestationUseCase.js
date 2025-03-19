const PrestationRetrieveOneResponseDto = require("../../../dto/prestation/PrestationRetrieveOneResponseDto");
const PrestationRetrieveManyResponseDto = require("../../../dto/prestation/PrestationRetrieveManyResponseDto");
class PrestationUseCase {

    constructor(prestationAdapter) {
        this.prestationAdapter = prestationAdapter;
    }

    async create({name,description,price,duration}) {
        const newPrestation = await this.prestationAdapter.create({name,description,price,duration});
        return new PrestationRetrieveOneResponseDto(newPrestation);
    }
    
    async remove(id) {
        await this.prestationAdapter.update(id,{isActive: false});
        return {id};
    }

    async retrieveById(id) {
        const prestation = await this.prestationAdapter.findById(id);
        return new PrestationRetrieveOneResponseDto(prestation);
    }

    async retrieveAll() {
        const prestations = await this.prestationAdapter.findAll();
        return new PrestationRetrieveManyResponseDto(prestations);
    }
}

module.exports = PrestationUseCase;