const express = require('express');
const router = express.Router();
const Customer = require('../domain/models/Customer');
// set url prefix to /customers

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;