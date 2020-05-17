const express = require("express");
const router = express.Router();
const Game = require('../models/game');
const Answer = require('../models/Answer');
const pusher = require('../pusher')
const generatePin = require('../helperfunctions/generatePin')

router.post("/makegame", async (req, res) => {
    const game = {
        pin: generatePin(),
        closed: false,
        ...req.body
    }
    console.log(req.body)
    Game.create(game, (err, game) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send({ id: game.id, pin: game.pin })
        }
    })
});

router.post("/joingame", async (req, res) => {
    const game = await Game.findOne({ pin: req.body.pin })
    if (game && !game.closed) {
        if (game.players.includes(req.body.player)) {
            res.status(400).send({ err: 'Naam is al bekend' })
        } else {
            game.players.push(req.body.player);
            game.save()
            pusher.trigger(req.body.pin, 'player-joining', `${req.body.player} has joined the game`);
            res.send(game)
        }
    } else if (game && game.closed) {
        res.status(400).send({ err: 'Game is al gestart' })
    } else {
        res.status(404).send({ err: 'Game niet gevonden' })
    }
});

router.post("/startgame", async (req, res) => {
    const game = await Game.findOne({ pin: req.body.pin })
    if (game) {
        const updatetGame = await Game.findOneAndUpdate({ pin: req.body.pin }, { closed: true }, { useFindAndModify: false })
        console.log(updatetGame)
        pusher.trigger(req.body.pin, 'game-start', 'Game is gestart')
        res.status(200).json('game is gestart')
    } else {
        res.status(404).json('Game niet gevonden')
    }
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
    res.status(200).json('Vraag is verstuurd')
})

router.post("/sendanswer", async (req, res) => {
    pusher.trigger(req.body.pin, 'send-answer', `${req.body.player} has answered with ${req.body.answer}`)
})

module.exports = router;
