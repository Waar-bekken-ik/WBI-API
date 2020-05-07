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

//routes
app.use("/games", gameRoutes);

// Fire server
app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}`);
});



