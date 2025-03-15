const express = require('express');
const router = express.Router();
const UserRequestDto = require('../dto/user/UserRequestDto');
const {userCreateUseCase,userLoginUseCase,userRetrieveUseCase,userUpdateUseCase} = require('../config/Container');



router.post('/register', async (req, res) => {
    try {
        const userRequestDto = new  UserRequestDto(req.body);
        let id = await userCreateUseCase.create(userRequestDto);
        res.status(201).json(id);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
});

router.post('/login', async(req,res) => {
    try{
        const loginResponseDto = await userLoginUseCase.login(req.body.email, req.body.password);
        res.status(200).json(loginResponseDto);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
});

router.get('/information/:token', async(req,res) => {
    try{
        const token = req.params.token;
        const userInfo = await userRetrieveUseCase.retrieveByToken(token);
        res.status(200).json(userInfo);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});

router.patch('/information/:userId', async(req,res) => {
    try{
        const userId = req.params.userId;
        const userUpdateInformation = new UserRequestDto(req.body);
        userUpdateUseCase.update(userId,userUpdateInformation);
        res.status(200).json({message : "User information updated"});
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});
module.exports = router;