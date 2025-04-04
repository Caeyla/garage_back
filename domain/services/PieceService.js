class PieceService {
    static async expectThatPiecesExist(pieceAdapter,pieceIds){
        if(!pieceIds || pieceIds.length == 0){ 
            throw new CustomError("Pieces are required",500);
        }
        let piecesNotfound = [];
        for (const pieceId of pieceIds) {
            const piece = await pieceAdapter.findById(pieceId);
            if(!piece){
                piecesNotfound.push(pieceId);
            }
        } 
        if(piecesNotfound.length > 0){
            throw new CustomError("Pieces not found  "+ piecesNotfound,404);
        }
    }
}