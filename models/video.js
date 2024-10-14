const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    video_url: { type: String, required: true },
    thumbnail_url: { type: String, required: true },

    description: { type: String },
    view_count: { type: Number, default: 0 },
    duration: { type: Number, required: true },

    created_at: { type: Date, default: Date.now },

    user: { type: Schema.Types.Number, ref: "User"},
    products: [{ type: Schema.Types.Number, ref: "Product"}],

    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    shares_count: { type: Number, default: 0 },
    is_liked: { type: Boolean, default: false },
    is_bookmarked: { type: Boolean, default: false },
    music: { type: Schema.Types.Number, ref: "Music"},
    hashtags: [{ type: Schema.Types.Number, ref: "Tag"}],
});

module.exports = mongoose.model("Video", VideoSchema);



  