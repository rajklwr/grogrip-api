const express = require('express');

const paymentController = require('../controllers/payment');

const router = express.Router();

router.post('/createOrder', paymentController.createOrder);

module.exports = router; 