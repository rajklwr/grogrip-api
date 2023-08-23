const express = require('express');

// const authTeam = require('../middleware/auth-team');

const auth = require('../middleware/auth-grogrip');

const grogripController = require('../controllers/grogrip');

const router = express.Router();


// router.get('/getUserDetail', grogripController.getUserDetail)
router.get('/getCart', auth, grogripController.getCart)
router.post('/addToCart', auth, grogripController.AddToCart)
router.post('/removeFromCart', auth, grogripController.removeFromCart)
router.post('/createOrder', grogripController.createOrder)
router.post('/getOrders', grogripController.gerOrders)
router.post('/submit-contact-form', grogripController.SubmitContactForm)



module.exports = router; 