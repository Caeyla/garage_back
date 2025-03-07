const express = require('express');
const router = express.Router();
const Mechano = require('../models/Mechano');

router.get('/', async (req, res) => {
    try {
        const mechanos = await Mechano.findAll();
        res.json(mechanos);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;