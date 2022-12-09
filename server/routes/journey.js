const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const router = express.Router();
const JourneyController = require('../controllers/journey');

router.get('/', JourneyController.getJourneys)

router.post('/', jsonParser, JourneyController.addJourney)

router.delete('/:id', JourneyController.deleteJourney)

router.get('/:id', JourneyController.getJourney)

router.post('/buy', jsonParser, JourneyController.buyJourneys);

module.exports = router;