const express = require('express');
const router = express.Router();
const Employee = require('../domain/models/Employee');
const handleErrorThrowing = require('../error/CustomErrorUtil');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

module.exports = router;
