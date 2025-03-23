const express = require('express');
const router = express.Router();
const handleErrorThrowing = require('../error/CustomErrorUtil');
const {prestationUseCase,pieceUseCase} = require('../config/Container');
const PrestationRequestDto = require('../dto/prestation/PrestationRequestDto');
/*********************************************************/
// PRESTATION ENDPOINTS        
/**************************************************** **/
router.post('/prestation', async (req, res) => {
    try {
        const prestationRequest = new PrestationRequestDto(req.body); 
        const createdPrestation = await prestationUseCase.create(prestationRequest);
        res.status(201).json(createdPrestation);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get('/prestation/:prestationId', async (req, res) => {
    try {
        const prestationId = req.params.prestationId;
        const prestation = await prestationUseCase.retrieveById(prestationId);
        res.status(200).json(prestation);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get('/prestations', async (req, res) => {
    try {
        const prestations = await prestationUseCase.retrieveAll();
        res.status(200).json(prestations.prestations);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

/***************************************************************************************/
// PIECE ENDPOINTS
/***************************************************************************************/

router.post('/piece', async (req, res) => {
    try { 
        const createdPiece = await pieceUseCase.createPiece(req.body);
        res.status(201).json(createdPiece);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.patch('/piece/:pieceId', async (req, res) => {
    try {
        const pieceId = req.params.pieceId;
        const updatedPiece = await pieceUseCase.updatePiece(pieceId,req.body);
        res.status(200).json(updatedPiece);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get('/piece/:pieceId', async (req, res) => {
    try {
        const pieceId = req.params.pieceId;
        const piece = await pieceUseCase.retrievePieceById(pieceId);
        res.status(200).json(piece);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get('/pieces', async (req, res) => {
    try {
        const pieces = await pieceUseCase.retrieveAllPieces();
        res.status(200).json(pieces.pieceDtos);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

module.exports = router;
