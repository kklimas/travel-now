const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const router = express.Router();
const JourneyCommentController = require('../controllers/journey-comment');
const JwtService = require("../services/jwt")

router.get('/', JourneyCommentController.getComments)

// get comments of journey with given id
router.get('/:id', JourneyCommentController.getCommentsByUserId)

router.post('/', jsonParser, JwtService.verifyUser, JourneyCommentController.addComment)

router.delete('/:id', JwtService.verifyUser, JourneyCommentController.deleteComment)

module.exports = router;