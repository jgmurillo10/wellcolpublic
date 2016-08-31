var express = require('express');
// var reports    = require('../../../reports_data').reports;

var fields = require('../../../data').fields;
var wells = require('../../../data').wells;
var router = express.Router();

// functions for validation
var tools = require('../../modules/Validator');

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
    if(tools.existsRegion(region)){

      if(tools.validReportType(reportType)){

        //code to make the report and return a JSON




        console.log("logic for this function correct");
        
        res.json("logic for region report GET");

      } else {
        res.json('That is not valid report type');
      }

    } else {
      res.json('There is no region with that name');
    }

  })


router.route('/fields/:field_id/:report_type/:from-:to')

  // get report from a field in an specified interval
  .get(function(req, res){
    var fieldId = Number(req.params.field_id);
    var reportType = req.params.report_type;
    
    if(tools.existsField(fieldId)){
      if(tools.validReportType(reportType)){

        res.json('logic for field report GET')

      } else {
        res.json('This is not a valid report type')
      }
 
    } else {
      res.json('There is no field with that id. You can only request a report frmo an existing field');
      }
  })

router.route('/wells/:well_id/:report_type/:from-:to')

  // get report from a well in an specified interval
  .get(function(req, res){
    var wellId = Number(req.params.well_id);
    var reportType = req.params.report_type;
    
    if(tools.existsWell(wellId) !== -1){
      if(tools.validReportType(reportType)){

        // extract the timestamps from :from and :to
        var from = tools.getTimestamp(req.params.from);
        var to = tools.getTimestamp(req.params.to);

        // searches through the data arrays


        res.json('logic for well report GET')

      } else {
        res.json('This is not a valid report tyye')
      }
 
    } else {
      res.json('There is no well with that id. You can only request a report frmo an existing well');
      }
  })

router.route('/wells/:well_id/:report_type')
  
  // post report from an specific well
  .post(function(req, res){
    var wellId = Number(req.params.well_id);
    var reportType = req.params.report_type;
    
    if(tools.existsWell(wellId) !== -1){
      if(tools.validReportType(reportType)){

        res.json('logic for well report POST')

      } else {
        res.json('This is not a valid report tyye')
      }
 
    } else {
      res.json('There is no well with that id. You can only request a report frmo an existing well');
      }
  })

module.exports = router;