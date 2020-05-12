const express = require("express");
const router = express.Router();
const Answer = require('../models/Answer');

router.post("/addanswer", async (req, res) => {
    Answer.findByIdAndUpdate(req.body.id, { $push: { answers: 'test123' } }, (err, answers) => {
        res.status(200).send(answers)
    })
});

router.post("/answer", async (req, res) => {
    const answer = await Answer.create(req.body)

    answer.save()
});

router.get("/getanswers", async (req, res) => {
    console.log(req.body)
    Answer.findById(req.body.id)
        .exec((err, response) => {
            if (err) {
                res.status(400).send();
            }
            res.send(response);
        });
});

module.exports = router;