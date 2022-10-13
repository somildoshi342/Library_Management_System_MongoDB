// Project Made by Somil Doshi, Preet Desai

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const path = require("path")

//Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extened: true }));
app.use('/', require('./routes/index.js'));
app.use(express.static(path.join(__dirname, "client", "build")))


//DB
const local = "mongodb://localhost:27017/Books";
mongoose.connect(local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully!!!');
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//Server
app.listen(process.env.PORT || 4000, () => {
    console.log('Server running at: http://localhost:4000/')
});