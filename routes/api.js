// imports
const express = require('express');
const apicache = require("apicache");
const apiController = require('../controllers/apiController')

// initializing a router object to handle 
// similar routes in the application
const router = express.Router();

// a cache middeware to cache api endpoints
let cache = apicache.middleware

// a simple get end-point to retrieve the required 'video' data from the database
// we also cache that result to avoid unneccessary and repeated database queries
// while requesting the same set of data
router.get('/homescreen', cache('1 day'), apiController.homescreen_get);

module.exports = router;