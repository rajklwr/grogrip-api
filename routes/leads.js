const express = require('express');

const leadsController = require('../controllers/leads');

const router = express.Router();

router.post('/generateLead', leadsController.leadsData);


module.exports = router; 