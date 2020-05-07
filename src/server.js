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





















// const Pusher = require('pusher');

// const pusher = new Pusher({
//     appId: '987970',
//     key: 'c6fd201f50ddc27a1163',
//     secret: '6f35f7d2e53920876a2c',
//     cluster: 'eu',
//     encrypted: true
// });

// setInterval(() => {
//     pusher.trigger('my-channel', 'my-event', 'timon jij kanker');
// }, 1000);

