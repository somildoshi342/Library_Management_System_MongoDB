const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/user');
const Fav = require('../model/fav');
const Buy = require('../model/buy')
const Book = require('../model/books');


router.get('/', (req, res) => {
    res.send("user")
})

router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    // check for missing filds
    if (!email || !password || !username) {
        res.send({ msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ email });
    if (doesUserExitsAlreay) {
        res.send({ msg: "Email already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.send({ msg: "Username already exists" });
        return;
    };

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword, username: user });

    latestUser
        .save()
        .then(() => {
            res.send({ msg: "Sucessfully Registered" });
            return;
        })
        .catch((err) => console.log(err));
});

router.post('/login', async (req, res) => {
    var { username, password } = req.body;

    // check for missing filds
    if (!username || !password) {
        res.send("Please enter all the fields");
        return;
    }
    username = username.charAt(0).toUpperCase() + username.slice(1);
    const doesUserExits = await User.findOne({ username });

    if (!doesUserExits) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }

    const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
    );

    if (!doesPasswordMatch) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }
    res.send({ msg: "success", user: { username: username } });
})

router.post('/addFav', async (req, res) => {
    const { title, user } = req.body;
    const result = await Book.find({ title: title })
    const latestFav = new Fav({ title, author: result[0].author, genre: result[0].genre, user });
    latestFav.save().then(() => res.status(200).send({ msg: "saved" })).catch((err) => {
        console.log(err)
        res.status(500).send({ msg: "error" })
    })
})

router.post('/buy', async (req, res) => {
    const { title, user } = req.body;
    const result = await Book.find({ title: title })
    const latestBuy = new Buy({ title, author: result[0].author, genre: result[0].genre, user });
    latestBuy.save().then((result) => {
        res.status(200).send({ msg: "saved" })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ msg: "error" })
    })
})

router.get('/getFavs/:user', async (req, res) => {
    Fav.find({ user: req.params.user })
        .then((result) => {
            res.send(result).status(200)
        }).catch((err) => {
            console.log(err)
            res.status(200).send({ msg: "Error" })
        })
})


router.get('/getBuys/:user', async (req, res) => {
    Buy.find({ user: req.params.user })
        .then((result) => {
            res.send(result).status(200)
        }).catch((err) => {
            console.log(err)
            res.status(200).send({ msg: "Error" })
        })
})


module.exports = router;