const express = require("express");
const winston = require("winston");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const register = require('./routes/register');
const login = require('./routes/logIn');

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log"}));

require('dotenv').config();



app.use(cors());
app.use(expree.json())

app.use("/api/register", register);
app.use('/api/sigin', login)

app.get("*", (req, res) => {
  res.send("Welcome to SignMeApp!");
});

const connection = process.env.CONNECTION_STRING 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));