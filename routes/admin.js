const express = require('express');
const router = express.Router()
const books = require('../model/books')


router.post('/addbook', async (req, res) => {
    const { title, author, genre } = req.body;
    latestBook = new books({ title, author, genre });
    latestBook.save()
        .then(() => {
            res.send({ msg: "saved" }).status(201)
        }).catch((err) => {
            console.log(err.msg)
            res.send({ msg: "not saved" }).status(500)
        });
})

router.post('/delbook', async (req, res) => {
    await books.deleteOne({ title: req.body.title })
        .then(() => {
            res.send({ msg: "deleted" }).status(200)
        }).catch((err) => {
            console.log(err);
            res.send({ msg: "failed" }).status(500)
        });

});

router.post('/editbook', async (req, res) => {
    const { title, author, genre } = req.body;
    await books.findOneAndUpdate({ title }, { title, author, genre })
        .then((result) => {
            res.send(result).status(200);
        }).catch((err) => {
            console.log(err);
            res.send({ msg: err.msg }).status(500)
        })
})

module.exports = router;