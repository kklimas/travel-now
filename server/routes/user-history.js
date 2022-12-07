const express = require("express");
const router = express.Router();
const UserHistoryController = require("../controllers/user-history");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.get("/", UserHistoryController.getRecords);

router.get("/:id", UserHistoryController.getUserRecords);

router.post("/", jsonParser, UserHistoryController.addRecord);

module.exports = router;
