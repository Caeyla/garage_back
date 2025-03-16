const express = require('express');
const router = express.Router();
const VehicleRequestDto = require("../dto/vehicle/VehicleRequestDto");
const JwtService = require('../domain/services/JwtService');
const {vehicleCreateUseCase,vehicleUpdateUseCase,vehicleRetrieveUseCase} = require('../config/Container');



router.post('/vehicle', async (req, res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicleRequestDto = new VehicleRequestDto(req.body)
        const response = await vehicleCreateUseCase.create(customerId,vehicleRequestDto);
        res.status(201).json(response);
    } catch (err) {
        res.json({ message: err.message });
    }
});
      
router.get("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicle = await vehicleRetrieveUseCase.retrieveByIdAndCustomerId(vehicleId,customerId);
        res.status(200).json(vehicle); 
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get("/vehicles", async (req, res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicles = await vehicleRetrieveUseCase.retrieveByCustomerId(customerId);
        res.status(200).json(vehicles); 
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.patch("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicleRequestDto = new VehicleRequestDto(req.body);
        await vehicleUpdateUseCase.update(customerId,vehicleId,vehicleRequestDto);
        res.status(200).json({ message: "Vehicle updated" }); 
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.delete("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        await vehicleUpdateUseCase.remove(customerId,vehicleId);
        res.status(200).json({ message: "Vehicle removed" }); 
    } catch (error) {
        res.json({ message: error.message });
    }
});



module.exports = router;