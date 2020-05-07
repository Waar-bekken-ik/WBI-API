const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/game');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '987970',
    key: 'c6fd201f50ddc27a1163',
    secret: '6f35f7d2e53920876a2c',
    cluster: 'eu',
    encrypted: true
});

function generatePin() {
    min = 0;
    max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}

router.post("/makegame", async (req, res) => {

    const game = {
        pin: generatePin(),
        ...req.body
    }

    Game.create(game, (err, game) => {
        res.send(game)
    })

});

router.post("/joingame", async (req, res) => {
    const game = await Game.findOne({ pin: req.body.pin })

    if (game) {
        pusher.trigger('my-channel', 'player-joining', `${req.body.player} has joined the game`);
        res.send(game)
    } else {
        res.status(404).send('Game not found')
    }

});

module.exports = router;
