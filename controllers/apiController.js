// imports
const asyncHandler = require("express-async-handler");
const Video = require("../models/video");
const User = require("../models/user");
const Music = require("../models/music");
const Product = require("../models/product");
const Tag = require("../models/tags");
const Variant = require("../models/variant");

// an async function to handle get request to the /api/homescreen endpoint
// the async handler here is a wrapper function that handles errors and exceptions via try-catch
// this helps us to reduce the repetition of try-catch blocks making the code more readable
exports.homescreen_get = asyncHandler(async (req, res, next) => {

    // validating the query parameters to ensure valid query parameters are being passed
    const allowedParams = ['cursor', 'limit']
    const invalidParams = Object.keys(req.query).filter(param => !allowedParams.includes(param));

    // checks if there are any invalid query parameters, if it does exist
    // we respond with a 400 status error
    if (invalidParams.length > 0) {
        return res.status(400).json({ error: `Invalid query parameters: ${invalidParams.join(', ')}` });
    }
    // retrieve the cursor's value and the limit
    const {cursor = null, limit = 10} = req.query;

    // compute the limit
    const currentLimit = parseInt(limit);
    
    // build a simple query which will be passed to the 
    // find query to retrieve the documents
    const query = cursor ? {_id: {$gt: cursor}} : {};

    // querying documents from the MongoDB database
    const videos = await Video.find(query)
    .populate({ path: 'user', model: User}) 
    .populate({ path: 'music', model: Music})   
    .populate({ path: 'hashtags', model: Tag}) 
    .populate({ 
      path: 'products', 
      model: Product,
      populate: {path: 'variants', model: Variant}
    }) 
    .sort({_id: 1})
    .limit(currentLimit )
    .exec();
    
    // computes the next_cursor's value
    // this value will be used in future requests
    const nextCursor = videos.length === currentLimit ? videos[videos.length - 1]._id : null;

    // compute the total page and video counts and the current page
    const videosCount = await Video.countDocuments();
    const pagesCount = Math.ceil(videosCount / currentLimit);
    const currentPage = (cursor) ? Math.floor(((cursor) / limit)) + 1 : 1


    // finally, we send a json response with
    // the neccessary data (videos and pagination data)
    res.json({
        videos,
        pagination: {
            page: currentPage,
            limit: currentLimit,
            total_pages: pagesCount,
            total_videos: videosCount,
            next_cursor: nextCursor
        }
    })  
})