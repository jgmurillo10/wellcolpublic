var express = require('express');
var router = express.Router();

//funcions for existence validaton
var tools = require('../../modules/Validator');

// postgres query helper 
var query = require('pg-query');



// on routes that end in /records
// ----------------------------------------------------
router.route('/')
 
  
  //get all sensors
  .get(function(req, res) {
    sql  = 'SELECT * FROM sensor_records';

    query(sql, function(err, result) {
      if (err) return res.send(err);
      res.json(result);

    });
  })




module.exports = router;