const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    _id : {type: Number, required: true},
    name: {type: String, requried: true},
    price: {type: Number, required: true},
    original_price: {type: Number, required: true},

    discount_percentage: {type: Number, default: 0},
    image_url: {type: String, requried: true},
    timestamp: {type: Number, required: true},

    currency: {type: String, required: true, default: "USD"},
    store: { type: Schema.Types.Number, ref: "Store"},
    in_stock: {type: Boolean, requried: true,   default: true},

    variants: [{type: Schema.Types.Number, ref: "Variant"}]

})

module.exports = mongoose.model("Product", ProductSchema);