var express = require('express');

var router = express.Router();

// on routes that end in /wells
// ----------------------------------------------------
router.route('/')

  .get(function(req, res) {
    res.json('Hello world.');
  })

  .put(function(req, res) {
    res.json('Hello world.');
  })

  .delete(function(req, res) {
    res.json('Hello world.');
  });

module.exports = router;