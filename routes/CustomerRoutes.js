const express = require('express');
const router = express.Router();
const Customer = require('../domain/models/Customer');
const VehicleRequestDto = require("../dto/vehicle/VehicleRequestDto")
const {vehicleCreateUseCase} = require('../config/Container');
const JwtService = require('../domain/services/JwtService');


router.post('/vehicle', async (req, res) => {
    try {
        const id = JwtService.decodeTokenFromRequest(req).id;
        console.log(id);
        const vehicleRequestDto = new VehicleRequestDto(req.body)
        vehicleCreateUseCase.create(id,vehicleRequestDto);
        res.status(201);
    } catch (err) {
        res.json({ message: err.message });
    }
});


module.exports = router;