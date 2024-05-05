const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { login, createUser } = require("./controllers/users");

const router = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

// NEW Login and Signup Routes
app.post("/signin", login);

app.post("/signup", createUser);

app.use("/", router);

// NEW
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
