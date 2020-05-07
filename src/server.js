const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/game");
const dotenv = require("dotenv");
dotenv.config();

// Fire mongoose
require('./config/mongoose');

// Server config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes
app.use("/games", gameRoutes);

// Fire server
app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}`);
});



