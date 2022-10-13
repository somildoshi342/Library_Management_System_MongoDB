const express = require('express');
const router = express.Router()
const books = require('../model/books')

router.use('/user', require('./user.js'));
router.use('/admin', require('./admin.js'));

router.get('/getBooks', async (req, res) => {
    const result = await books.find({});
    res.send(result).status(201)

})



module.exports = router;