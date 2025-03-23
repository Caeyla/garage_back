class PieceRetrieveOneResponseDto {
    constructor({_id, name, price ,description}) {
        this.id = _id;
        this.price = price;
        this.name = name;
        this.description = description;
    }
}

module.exports = PieceRetrieveOneResponseDto;