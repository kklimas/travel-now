const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const JourneyCommentController = require('../controllers/journey-comment');
//
router.get('/', JourneyCommentController.getComments)

// get comments of journey with given id
router.get('/:id', JourneyCommentController.getCommentsByUserId)

router.post('/', jsonParser, JourneyCommentController.addComment)

router.delete('/:id', JourneyCommentController.deleteComment)

module.exports = router;