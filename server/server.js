const cors = require("cors");
const { config } = require("dotenv");
config();

const logger = require("./utils/logger");
const DatabaseService = require('./database/database-handling')
DatabaseService.connect();

const express = require("express");
const app = express();

const journeys = require("./routes/journey");
const comments = require("./routes/journey-comments");
const historyRecords = require("./routes/user-history");
const users = require("./routes/user");
const auth = require("./routes/auth")

const port = parseInt(process.env.SERVER_PORT);

app.use(cors());

// auth
app.use("/auth", auth)

// journeys
app.use("/journeys", journeys);

// comments
app.use("/comments", comments);

// history
app.use("/history", historyRecords);

// users
app.use("/users", users);

app.listen(port, () => logger.info(`Server running on port: ${port}`));
