const express = require('express');

const userController = require('../controllers/user');
const adminController = require('../controllers/Adimin');
const user = require('../models/user');

const router = express.Router();

router.post('/AddUser', adminController.addUser);
router.post('/AddTask', adminController.addTask);

module.exports = router; 