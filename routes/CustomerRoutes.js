const express = require('express');
const router = express.Router();
const VehicleRequestDto = require("../dto/vehicle/VehicleRequestDto")
const {vehicleCreateUseCase,vehicleUpdateUseCase} = require('../config/Container');
const JwtService = require('../domain/services/JwtService');


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

router.patch("/vehicle/:vehicleId", async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const vehicleRequestDto = new VehicleRequestDto(req.body);
        const response = await vehicleUpdateUseCase.update(customerId,vehicleId,vehicleRequestDto);
        res.status(200).json(response); 
    } catch (error) {
        res.json({ message: error.message });
    }
})


module.exports = router;