const { config } = require("dotenv");
const mongoose = require("mongoose");
config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const url = `mongodb+srv://${username}:${password}@cluster0.jp5orob.mongodb.net/?retryWrites=true&w=majority`;
const db = mongoose.connection;

function connect() {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to database");
});

module.exports = connect;
