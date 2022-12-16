const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const router = express.Router();
const JourneyController = require('../controllers/journey');
const JwtService = require("../services/jwt")

router.get('/', JourneyController.getJourneys)

router.post('/', jsonParser, JwtService.verifyManager, JourneyController.addJourney)

router.put('/', jsonParser, JwtService.verifyManager, JourneyController.modifyJourney)

router.delete('/:id', JwtService.verifyManager, JourneyController.deleteJourney)

router.get('/:id', JourneyController.getJourney)

router.post('/buy', jsonParser, JwtService.verifyUser, JourneyController.buyJourneys);

module.exports = router;