const express = require('express');
const router = express.Router();
const CreateUserDto = require('../dto/user/CreateUserDto');
const {userCreateUseCase,userLoginUseCase,userRetrieveUseCase} = require('../config/Container');



router.post('/register', async (req, res) => {
    try {
        const createUserDto = new  CreateUserDto(req.body);
        let id = await userCreateUseCase.create(createUserDto);
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

module.exports = router;