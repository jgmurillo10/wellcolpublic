var express = require('express');
var reports    = require('../../../data').reports;

var fields = require('../../../data').fields;
var wells = require('../../../data').wells;
var router = express.Router();

// arrays for validation
var regions = require('../../../types').regions;
var report_types = require('../../../types').report_types;

// functions for validation
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

function validRegion(region) {
  for(var i  = 0; i < regions.length; i++ ){
    if(regions[i] === region){
      return true;
    }
  }
  return false;
}

function validReportType(reportType){
  for(var i  = 0; i < report_types.length; i++ ){
    if(report_types[i] === reportType){
      return true;
    }
  }
  return false;
}



// on routes that end in /reports
// ----------------------------------------------------

router.route('/regions/:region/:report_type/:from-:to')
  

  // get report from a region in an specified interval
  .get(function(req, res){
    var region = req.params.region;
    var reportType = req.params.report_type;
    var from = req.params.from;
    var to = req.params.to;

    // check if the region exists
    if(validRegion(region)){

      if(validReportType(reportType)){

        //code to make the report and return a JSON
        console.log("logic for this function correct");
        res.json("logic for this function correct");
      } else {
        res.json('That is not valid type');
      }

    } else {
      res.json('There is no region with that name');
    }

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