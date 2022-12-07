const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const JourneyController = require('../controllers/journey');
//
router.get('/', JourneyController.getJourneys)

router.get('/:id', JourneyController.getJourney)

router.post('/', jsonParser, JourneyController.addJourney)

router.delete('/:id', JourneyController.deleteJourney)

module.exports = router;