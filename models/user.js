const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {type: Number, required: true},
    username: {type: String, required: true},
    display_name: {type: String, required: true},
    profile_picture_url: {type: String},

    bio: {type: String},
    followers_count: {type: Number, default: 0},
    verified: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", UserSchema);