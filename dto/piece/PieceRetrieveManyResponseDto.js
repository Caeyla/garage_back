const PieceRetrieveOneDto = require("./PieceRetrieveOneResponseDto");

class PieceRetrieveManyRepsonseDto {
    constructor(pieces) {
        this.pieceDtos = this.convertToDto(pieces);
    }

    convertToDto(pieces) {
        const pieceDtos = [];
        for (const piece of pieces) {
            pieceDtos.push(new PieceRetrieveOneDto(piece));
        }
        return pieceDtos;
    }
}

module.exports = PieceRetrieveManyRepsonseDto;