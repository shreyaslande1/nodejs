const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectedURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
});
const URL = mongoose.model("url", urlschema);

module.exports = URL;