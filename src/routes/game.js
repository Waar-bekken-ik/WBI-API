const express = require("express");
const router = express.Router();
const Game = require('../models/game');
const pusher = require('../pusher')
const generatePin = require('../helperfunctions/generatePin')

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
        pusher.trigger(req.body.pin, 'player-joining', `${req.body.player} has joined the game`);
        res.send(game)
    } else {
        res.status(404).send('Game not found')
    }
});

router.get("/startgame", async (req, res) => {
    pusher.trigger(req.body.pin, 'starting-game', 'game is gestart!')
    res.status(200).send('game is gestart')
})

module.exports = router;
