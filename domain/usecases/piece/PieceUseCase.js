const CustomError = require("../../../error/CustomError");
const PieceRetrieveOneResponseDto = require("../../../dto/piece/PieceRetrieveOneResponseDto");
const PieceRetrieveManyResponseDto = require("../../../dto/piece/PieceRetrieveManyResponseDto");
class PieceUseCase{
    constructor(pieceAdapter){
        this.pieceAdapter = pieceAdapter;
    }

    async createPiece({name,price,description}) {
        const createdPiece = await this.pieceAdapter.create({name,price,description});
        return new PieceRetrieveOneResponseDto(createdPiece);
    }

    async updatePiece(id,updatesToPiece) {
        const pieceFromDb = await this.pieceAdapter.findById(id);
        if(!pieceFromDb) {
            throw new CustomError("Piece not found",404);
        }
        await this.pieceAdapter.update(id,updatesToPiece);
        const updatedPiece = await this.pieceAdapter.findById(id);
        return new PieceRetrieveOneResponseDto(updatedPiece); 
    }

    async retrievePieceById(id) {
        const pieceFromDb = await this.pieceAdapter.findById(id);
        if(!pieceFromDb) {
            throw new CustomError("Piece not found",404);
        }
        return new PieceRetrieveOneResponseDto(pieceFromDb);
    }

    async retrieveAllPieces() {
        const pieces = await this.pieceAdapter.findAll();
        return new PieceRetrieveManyResponseDto(pieces);
    }
}

module.exports = PieceUseCase;