const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    _id: {type: Number, required: true},
    name: {type: String, requried: true},
    logo_url: {type: String}
})

module.exports = mongoose.model("Store", StoreSchema);