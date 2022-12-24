const express = require("express");
const router = express.Router();
const UserHistoryController = require("../controllers/user-history");
const bodyParser = require('body-parser')
const JwtService = require("../services/jwt")

router.get("/", JwtService.verifyUser, UserHistoryController.getUserRecords);

module.exports = router;
