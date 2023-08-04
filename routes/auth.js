const express = require('express');

const authController = require('../controllers/auth');


const router = express.Router();

router.post('/signIn', authController.signIn);
router.post('/sentOtp', authController.SentOtp);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/LoginEmployee', authController.LoginEmployee);
router.post('/AddEmployee', authController.AddEmployee);
router.get('/getAllTeam', authController.getAllTeam);


// router.get('/workspace/login', authController.WorkspaceLogin);

module.exports = router; 