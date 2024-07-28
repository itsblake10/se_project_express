// NEW
require('dotenv').config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { errors } = require("celebrate");

const { errorLogger } = require("express-winston");

const { login, createUser } = require("./controllers/users");

const router = require("./routes");

const app = express();

// NEW
const errorHandler = require("./middlewares/error-handler");
const { requestLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use(cors());

// NEW
app.use(requestLogger);

// Login and Signup Routes
app.post("/signin", login);

app.post("/signup", createUser);

app.use("/", router);

app.use(errorLogger);

// NEW
app.use(errors());

// NEW
app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
