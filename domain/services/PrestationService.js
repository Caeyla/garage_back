class PrestationService{
    static expectThatPrestationsExist(prestationAdapter,prestations) {
        const prestationNotFounds = [];
        for(const prestationId of prestations) {
            const prestation = prestationAdapter.findById(prestationId);
            if(!prestation) {
                prestationNotFounds.push(prestationId);
            }
        }
        if(prestationNotFounds.length > 0) {
            throw new CustomError(`Prestation not found for ids ${prestationNotFounds}`,404);
        }
    }
}

module.exports = PrestationService