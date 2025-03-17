const express = require('express');
const router = express.Router();
const handleErrorThrowing = require('../error/CustomErrorUtil');

router.get('/', async (req, res) => {
    try {
        res.status(200).json({
            status: "OK"
        });
    } catch (error) {
        handleErrorThrowing(res,error);
    }
});

module.exports = router;