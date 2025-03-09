const express = require('express');
const router = express.Router();
const Employee = require('../domain/models/Employee');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
