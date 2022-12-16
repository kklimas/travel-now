const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const UserController = require('../controllers/user')
const JwtService = require('../services/jwt')

router.get('/', JwtService.verifyAdmin, UserController.getUsers)

router.put('/', jsonParser, JwtService.verifyAdmin, UserController.modify)

router.delete('/', UserController.deleteUsers)

module.exports = router;