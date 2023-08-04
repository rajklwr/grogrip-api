const express = require('express');

const authTeam = require('../middleware/auth-team');

const userController = require('../controllers/user')

const router = express.Router();

router.post('/user', userController.addUser);

router.get('/getUserDetail', authTeam, userController.getUserDetail)


module.exports = router; 