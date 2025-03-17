const express = require('express');
const router = express.Router();
const UserRequestDto = require('../dto/user/UserRequestDto');
const {userCreateUseCase,userLoginUseCase,userRetrieveUseCase,userUpdateUseCase} = require('../config/Container');
const JwtService = require('../domain/services/JwtService');
const handleErrorThrowing = require('../error/CustomErrorUtil');
const authenticationMiddleware = require('../config/AuthenticationMiddleware');



router.post('/register', async (req, res) => {
    try {
        const userRequestDto = new  UserRequestDto(req.body);
        let id = await userCreateUseCase.create(userRequestDto);
        res.status(201).json(id);
    } catch (error) {
        handleErrorThrowing(res,error)
    }
});

router.post('/login', async(req,res) => {
    try{
        const loginResponseDto = await userLoginUseCase.login(req.body.email, req.body.password);
        res.status(200).json(loginResponseDto);
    } catch (error) {
        handleErrorThrowing(res,error)
    }
});

router.get('/information',authenticationMiddleware ,async(req,res) => {
    try{
        const userId = JwtService.decodeTokenFromRequest(req).id;
        const userType = JwtService.decodeTokenFromRequest(req).userType;
        const userInfo = await userRetrieveUseCase.retrieveByIdAndUserType(userId,userType);
        res.status(200).json(userInfo);
    }catch(error){
        handleErrorThrowing(res,error);
    }
});

router.patch('/information/:userId', async(req,res) => {
    try{
        const userId = req.params.userId;
        const userUpdateInformation = new UserRequestDto(req.body);
        userUpdateUseCase.update(userId,userUpdateInformation);
        res.status(200).json({message : "User information updated"});
    }catch(error){
        handleErrorThrowing(res,error);
    }
});
module.exports = router;