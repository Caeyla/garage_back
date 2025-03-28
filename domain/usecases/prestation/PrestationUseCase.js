const PrestationRetrieveOneResponseDto = require("../../../dto/prestation/PrestationRetrieveOneResponseDto");
const PrestationRetrieveManyResponseDto = require("../../../dto/prestation/PrestationRetrieveManyResponseDto");
const CustomError = require("../../../error/CustomError");
class PrestationUseCase {

    constructor(prestationAdapter,specialityAdapter) {
        this.prestationAdapter = prestationAdapter;
        this.specialityAdapter = specialityAdapter;
    }

    async create({name,description,price,duration,specialities}) {
        await this.checkIfSpecialitiesExist(specialities);
        const newPrestation = await this.prestationAdapter.create({name,description,price,duration,specialities});
        return new PrestationRetrieveOneResponseDto(newPrestation);
    }
    
    async checkIfSpecialitiesExist(specialityIds) {
        if(!specialityIds || specialityIds.length === 0){
            throw new CustomError("Specialities must be provided", 500);
        }
        const specialitiesFromDb = await this.specialityAdapter.findByIds(specialityIds);
        const specialityNotfounds = [];
        
        for(const specialityId of specialityIds){
            if(!specialitiesFromDb.find(speciality => speciality._id == specialityId)){
                specialityNotfounds.push(specialityId);
            }
        }
        
        if(specialityNotfounds.length > 0){
            throw new CustomError("Specialities not found: "+specialityNotfounds.join(", "), 404);
        }
    }

    async remove(id) {
        await this.prestationAdapter.update(id,{isActive: false});
        return {id};
    }

    async update(id,updatesToPrestation) {
        const prestationFromDb = await this.prestationAdapter.findById(id);
        if(!prestationFromDb) {
            throw new CustomError("Prestation not found",404);
        }
        const finalUpdateData = {
            name: updatesToPrestation.name || prestationFromDb.name,
            description: updatesToPrestation.description || prestationFromDb.description,
            price: updatesToPrestation.price || prestationFromDb.price,
            duration: updatesToPrestation.duration || prestationFromDb.duration
        }
        await this.prestationAdapter.update(id,finalUpdateData);
        const updatedPrestation = await this.prestationAdapter.findById(id);
        return new PrestationRetrieveOneResponseDto(updatedPrestation);
    }

    async retrieveById(id) {
        const prestation = await this.prestationAdapter.findById(id);
        if(!prestation) {
            throw new CustomError("Prestation not found",404);
        }
        return new PrestationRetrieveOneResponseDto(prestation);
    }

    async retrieveAll() {
        const prestations = await this.prestationAdapter.findAll();
        return new PrestationRetrieveManyResponseDto(prestations);
    }
}

module.exports = PrestationUseCase;