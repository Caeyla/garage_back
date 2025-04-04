const express = require('express');
const router = express.Router();
const VehicleRequestDto = require("../dto/vehicle/VehicleRequestDto");
const JwtService = require('../domain/services/JwtService');
const {vehicleCreateUseCase,vehicleUpdateUseCase,vehicleRetrieveUseCase} = require('../config/Container');
const handleErrorThrowing = require('../error/CustomErrorUtil');
const AppointmentRequestDto = require("../dto/appointment/AppointmentRequestDto");
const {appointmentCreateUseCase,appointmentRetrieveUseCase,appointmentUpdateUseCase} = require('../config/Container');
const {unavailabilityProviderUseCase} = require('../config/Container');
const UserType = require('../domain/enumeration/UserType');

/*********************************************************/
// APPOINTMENT ENDPOINTS        
/**************************************************** **/

router.post('/appointment', async (req, res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const appointmentRequestDto = new AppointmentRequestDto(req.body);
        const response = await appointmentCreateUseCase.create(appointmentRequestDto,customerId);
        res.status(201).json(response);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get("/appointments", async (req, res) => {
    try {
        const userId = JwtService.decodeTokenFromRequest(req).id;
        const userType = JwtService.decodeTokenFromRequest(req).userType;
        let results=null;
        if(userType === UserType.MANAGER){
            //retrieve all customers appointments scheduled
            results = await appointmentRetrieveUseCase.retrieveRemainingAppointment(null,null);
        }else if(userType === UserType.CUSTOMER){
            results = await appointmentRetrieveUseCase.retrieveRemainingAppointment(userId,null);
        }else if (userType === UserType.MECHANIC){
            results = await appointmentRetrieveUseCase.retrieveRemainingAppointment(null,userId);
        }
        res.status(200).json(results.appointments);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.get("/appointments/historic", async(req,res) => {
    try {
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const response = await appointmentRetrieveUseCase.retrieveAppointmentHistoricByCustomerId(customerId);
        res.status(200).json(response.appointments); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

router.put("/appointment/:appointmentId/cancel", async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const customerId = JwtService.decodeTokenFromRequest(req).id;
        const response = await appointmentUpdateUseCase.cancelAppointment(customerId,appointmentId);
        res.status(200).json(response); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
})

router.get("/appointment/:appointmentId", async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const userId = JwtService.decodeTokenFromRequest(req).id;
        const userType = JwtService.decodeTokenFromRequest(req).userType;
        let result = null; 
        if(userType == UserType.CUSTOMER) {
            result = await appointmentRetrieveUseCase.retrieveById(appointmentId,userId);
        }
        if(userType == UserType.MECHANIC) {
            result = await appointmentRetrieveUseCase.retrieveById(appointmentId,null,userId);
        }
        if(userType == UserType.MANAGER) {
            result = await appointmentRetrieveUseCase.retrieveById(appointmentId,null,null,userId);
        }

        res.status(200).json(result); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});




/*********************************************************/
// VEHICLE ENDPOINTS        
/**************************************************** **/

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

/*********************************************************/
// PRESTATION ENDPOINTS        
/**************************************************** **/

router.get("/unaivailability/:prestationId", async (req, res) => {
    try {
        const prestationId = req.params.prestationId;
        const prestation = await unavailabilityProviderUseCase.getUnavailableDates(prestationId);
        res.status(200).json(prestation); 
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});
module.exports = router;