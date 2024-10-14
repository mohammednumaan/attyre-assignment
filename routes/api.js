// imports
const express = require('express');
const Video = require("../models/video");
const User = require("../models/user");
const Music = require("../models/music");
const Product = require("../models/product");
const Tag = require("../models/tags");
const Variant = require("../models/variant");

// intializing a router object to handle 
// simila routes in the application
const router = express.Router();

// a simple get end-point to retrieve the required 'video' data from the database
router.get('/homescreen', async function(req, res, next) {
    const video = await Video.findOne()
    .populate({ path: 'user', model: User}) 
    .populate({ path: 'music', model: Music}) 
    .populate({ path: 'hashtags', model: Tag}) 
    .populate({ 
      path: 'products', 
      model: Product,
      populate: {path: 'variants', model: Variant}
    }) 
    .exec();
    return res.json({video});
});


module.exports = router;
