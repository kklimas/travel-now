const { config } = require("dotenv");
config();

const connect = require('./database/connect')
connect();

const express = require("express");
const app = express();

const journeys = require("./routes/journey");
const comments = require("./routes/journey-comments");
const historyRecords = require("./routes/user-history");
const users = require('./routes/user');


const port = parseInt(process.env.SERVER_PORT);

// journeys
app.use("/journeys", journeys);

// comments
app.use("/comments", comments);

// history
app.use("/history", historyRecords);

// users
app.use("/users", users);

app.listen(port, () => console.log(`Server running on port: ${port}`));
