const express = require('express');

const dashboardController = require('../controllers/dashboard');
const isAuth = require('../middleware/is-auth');
const authTeam = require('../middleware/auth-team');

const router = express.Router();

// router.get('/getTask', isAuth, dashboardController.getTask);
router.get('/getClientType', isAuth, dashboardController.getClientType);
// router.post('/updateTask', dashboardController.updateTask);
// router.post('/getSheet', isAuth, dashboardController.getSheet);
//router.add()

router.post('/v1/createTask', authTeam, dashboardController.createTask);
router.post('/v1/updateTask', authTeam, dashboardController.updateTaskV1);
router.post('/v1/deleteTask', authTeam, dashboardController.deleteTask);
router.get('/v1/getAllTask', authTeam, dashboardController.getAllTask);

//contents i,e video file, script drive link

router.post('/updateContent', dashboardController.updateContent)
router.post('/getContentbyId', dashboardController.getContentbyId)

router.post('/AssignTask', authTeam, dashboardController.AssignTask)
router.post('/uploadFile', authTeam, dashboardController.UploadFile)



module.exports = router;  