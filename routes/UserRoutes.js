const express = require('express');
const router = express.Router();
const CreateUserDto = require('../dto/request/CreateUserDto');
const {userCreateUseCase} = require('../config/Container');


router.post('/register', async (req, res) => {
    try {
        const createUserDto = new  CreateUserDto(req.body);
        let id = await userCreateUseCase.create(createUserDto);
        res.status(201).json(id);
    } catch (err) {
        res.status(500).json({ message : err });
    }
});

module.exports = router;