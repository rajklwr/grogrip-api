const express = require('express');

const commentController = require('../controllers/comment');
const authTeam = require('../middleware/auth-team');

const router = express.Router()

router.post('/getComment', commentController.getComment);
router.post('/addComment', authTeam, commentController.addComment);

module.exports = router