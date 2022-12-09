const express = require("express");
const router = express.Router();
const UserHistoryController = require("../controllers/user-history");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get("/", UserHistoryController.getRecords);

router.get("/:id", UserHistoryController.getUserRecords);

router.post("/", jsonParser, UserHistoryController.addRecord);

module.exports = router;
