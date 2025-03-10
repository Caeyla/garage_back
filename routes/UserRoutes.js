const express = require('express');
const router = express.Router();
const User = require('../domain/models/User');

router.post('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;