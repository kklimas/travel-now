const {config} = require("dotenv");
const mongoose = require("mongoose");
const logger = require("../utils/logger")
config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const url = `mongodb+srv://${username}:${password}@cluster0.jp5orob.mongodb.net/?retryWrites=true&w=majority`;
const db = mongoose.connection;

exports.connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    logger.info("Connected successfully to database")
});