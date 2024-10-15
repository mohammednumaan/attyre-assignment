// imports
const express = require('express');

// initializing a router object to handle
// similar routes (user routes)
const router = express.Router();

// a simple get endpoint to access the /user/ route
router.get('/', function(req, res, next) {
  res.send('Demo User Route.');
});

module.exports = router;
