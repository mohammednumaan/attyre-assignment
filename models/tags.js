    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const TagSchema = new Schema({
        _id: {type: Number, required: true},
        name: {type: String}
    })

    module.exports = mongoose.model("Tag", TagSchema);