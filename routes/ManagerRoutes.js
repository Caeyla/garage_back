const express = require('express');
const router = express.Router();
const Manager = require('../domain/models/Manager');

router.get('/', async (req, res) => {
    try {
        const managers = await Manager.findAll();
        return res.json(managers);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
