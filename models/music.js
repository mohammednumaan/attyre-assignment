const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    cover_url: { type: String }
});

module.exports = mongoose.model("Music", MusicSchema);