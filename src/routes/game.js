const express = require("express");
const router = express.Router();
const Game = require('../models/game');
const Answer = require('../models/Answer');
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
    pusher.trigger(req.body.pin, 'send-question', 'Game is gestart')
    res.status(200).send('game is gestart')
})

router.post("/nextquestion", async (req, res) => {
    const answers = await Answer.findById(req.body.id)
    let possibleAnswers = answers.answers.filter((answer) => answer !== req.body.correctAnswer)
    console.log(possibleAnswers)
    function randomAnswers() {
        var colArr = [];
        for (var i = 0; i < 3; i++) {
            var rand = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            possibleAnswers = possibleAnswers.filter((answer) => answer !== rand)
            colArr.push(rand);
        }
        colArr.push(req.body.correctAnswer)
        return colArr
    }

    pusher.trigger(req.body.pin, 'send-question', {
        possibleAnswers: randomAnswers(),
        correctAnswer: req.body.correctAnswer
    })
    res.status(200).send('game is gestart')
})

router.post("/sendanswer", async (req, res) => {
    pusher.trigger(req.body.pin, 'send-answer', `${req.body.player} has answered with ${req.body.answer}`)
    res.status(200).send('game is gestart')
})

module.exports = router;
