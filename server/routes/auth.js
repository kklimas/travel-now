const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const AuthController = require('../controllers/auth')
const JwtService = require("../services/jwt");

router.post('/register', jsonParser, AuthController.register)

router.post('/login', jsonParser, AuthController.login)

router.get('/refresh', JwtService.verifyUser, AuthController.refresh)

module.exports = router;