const express = require('express');
const router = express.Router();
const handleErrorThrowing = require('../error/CustomErrorUtil');
const {prestationUseCase} = require('../config/Container');
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


module.exports = router;
