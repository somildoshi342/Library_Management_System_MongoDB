const mongoose = require("mongoose");

const BuySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("Buys", BuySchema);