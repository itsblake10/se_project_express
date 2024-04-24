const express = require("express");

const mongoose = require("mongoose");

const router = require("./routes");

const cors = require("cors");

const { login, createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use("/", router);

//###Login and Signup Routes
app.post("/signin", authMiddleware, login);

app.post("/signup", authMiddleware, createUser);

//###
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
