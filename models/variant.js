const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    options: {type: [String], required: true}
})

module.exports = mongoose.model("Variant", VariantSchema);
