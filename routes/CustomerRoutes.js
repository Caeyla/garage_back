const express = require('express');
const router = express.Router();
const VehicleRequestDto = require("../dto/vehicle/VehicleRequestDto");
const JwtService = require('../domain/services/JwtService');
const {vehicleCreateUseCase,vehicleUpdateUseCase,vehicleRetrieveUseCase} = require('../config/Container');
const handleErrorThrowing = require('../error/CustomErrorUtil');


router.post('/vehicle', async (req, res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicleRequestDto = new VehicleRequestDto(req.body)
        const response = await vehicleCreateUseCase.create(customerId,vehicleRequestDto);
        res.status(201).json(response);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});
      
router.get("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicle = await vehicleRetrieveUseCase.retrieveByIdAndCustomerId(vehicleId,customerId);
        res.status(200).json(vehicle); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get("/vehicles", async (req, res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const response = await vehicleRetrieveUseCase.retrieveByCustomerId(customerId);
        res.status(200).json(response.vehicles); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.patch("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicleRequestDto = new VehicleRequestDto(req.body);
        const response = await vehicleUpdateUseCase.update(customerId,vehicleId,vehicleRequestDto);
        res.status(200).json(response); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.delete("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const response = await vehicleUpdateUseCase.remove(customerId,vehicleId);
        res.status(200).json(response); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});



module.exports = router;