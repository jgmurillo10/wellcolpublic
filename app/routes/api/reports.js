var express = require('express');
var reports    = require('../../../data').reports;
var wells = require('../../../data').wells;
var router = express.Router();

// on routes that end in /reports
// ----------------------------------------------------

router.route('/regions/:region_id/:report_type/:from-:to')
  

  // get report from a region in an specified interval
  .get(function(req, res){
    
  })


router.route('/fields/:field/:report_type/:from-:to')

  .get(function(req, res){

  })

router.route('/regions/:region_id/:report_type')

  .get(function(req, res){

  })

router.route('/wells/:well_id/:report_type/:from-:to')
  
  .post(function(req, res){
    
  })





module.exports = router;