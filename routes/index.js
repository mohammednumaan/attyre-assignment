// imports
const express = require('express');

// intializing a router object to handle 
// simila routes in the application
const router = express.Router();

// a simple get endpoint to render the index route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
