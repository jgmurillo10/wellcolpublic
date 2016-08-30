var express = require('express');
var reports    = require('../../../data').reports;

var fields = require('../../../data').fields;
var wells = require('../../../data').wells;
var router = express.Router();



// fucntions for validation
var tools = require('../../../tools');



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
    if(tools.validRegion(region)){

      if(tools.validReportType(reportType)){

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