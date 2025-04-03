const express = require('express');
const router = express.Router();
const handleErrorThrowing = require('../error/CustomErrorUtil');
const JwtService = require('../domain/services/JwtService');
const {retrieveUnavailabilityUseCase} = require('../config/Container');
router.get('/unaivailabilities', async (req, res) => {
    try {
        const mechanicId = JwtService.decodeTokenFromRequest(req).id;
        const unavailabilities = await retrieveUnavailabilityUseCase.retrieveUnavailabilityDates(mechanicId);
        res.status(200).json(unavailabilities.unavailableDates);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get('/appointments', async (req, res) => {
    try {
        const mechanicId = JwtService.decodeTokenFromRequest(req).id;
        const appointments = await retrieveUnavailabilityUseCase.retrieveAppointments(mechanicId);
        res.status(200).json(appointments.appointments);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
})

router.post('/unavailability', async (req, res) => {
    try {
        const employeeId = JwtService.decodeTokenFromRequest(req).id;
        const createdUnavailability = await addUnavailabilityUseCase.addUnavailabilities(employeeId,new UnavailableDateRequestDto(req.body));
        res.status(201).json(createdUnavailability);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

module.exports = router;