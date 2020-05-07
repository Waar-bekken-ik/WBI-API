const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/game');

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


    Game.create(game, (game) => {
        res.send(game)
    })

});

router.post("/joingame", async (req, res) => {

    res.send('okeee')
});

module.exports = router;
