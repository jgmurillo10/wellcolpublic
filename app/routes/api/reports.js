var express = require('express');
// var reports    = require('../../../reports_data').reports;

var fields = require('../../../data').fields;
var wells = require('../../../data').wells;
var router = express.Router();

var report_types = require('../../modules/constants').report_types;
var tools = require('../../modules/Validator');
var reporter = require('../../modules/Reporter');

// on routes that end in /reports
// ----------------------------------------------------

router.route('/regions/:region/:report_type/')
  

  // get report from a region in an specified interval
  .get(function(req, res){
    var region = req.params.region;
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;

    // check if the region exists
    if(tools.existsRegion(region)){

      if(tools.validReportType(reportType)){

        var report = {};

        if (reportType === 'consumo_energetico') {
          report = reporter.getRegionEnergyReport(region, reportType, from, to);
        }
        else if (reportType === 'produccion_fluido') {
          report = reporter.getRegionFlowReport(region, reportType, from, to);
        }
        else if (reportType === 'temperatura') {
          report = reporter.getRegionTempReport(region, reportType, from, to);
        }
        
        res.json(report);

      } else {
        res.json({'message': 'That is not valid report type'});
      }

    } else {
      res.json({'message': 'There is no region with that name'});
    }

  })


router.route('/fields/:field_id/:report_type/')

  // get report from a field in an specified interval
  .get(function(req, res){
    var fieldId = Number(req.params.field_id);
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;
    
    if(tools.existsField(fieldId)){
      if(tools.validReportType(reportType)){

        var report = {};

        if (reportType === 'consumo_energetico') {
          report = reporter.getFieldEnergyReport(fieldId, reportType, from, to);
        }
        else if (reportType === 'produccion_fluido') {
          report = reporter.getFieldFlowReport(fieldId, reportType, from, to);
        }
        else if (reportType === 'temperatura') {
          report = reporter.getFieldTempReport(fieldId, reportType, from, to);
        }
        
        res.json(report);

      } else {
        res.json({'message': 'This is not a valid report type'})
      }
 
    } else {
      res.json({'message': 'There is no field with that id. You can only request a report frmo an existing field'});
      }
  })

router.route('/fields/:field_id/wells/:well_id/:report_type/')

  // get report from a well in an specified interval
  .get(function(req, res){
    var wellId = Number(req.params.well_id);
    var fieldId = Number(req.params.field_id);
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;
    
    if(tools.existsWell(wellId) !== -1){
      if(tools.validReportType(reportType)){

        var report = {};

        if (reportType === 'consumo_energetico') {
          report = reporter.getWellFlowReport(wellId, fieldId, reportType, from, to);
        }
        else if (reportType === 'produccion_fluido') {
          report = reporter.getWellFlowReport(wellId, fieldId, reportType, from, to);
        }
        else if (reportType === 'temperatura') {
          report = reporter.getWellFlowReport(wellId, fieldId, reportType, from, to);
        }
        
        res.json(report);

      } else {
        res.json({'message': 'This is not a valid report tyye'});
      }
 
    } else {
      res.json({'message': 'There is no well with that id. You can only request a report frmo an existing well'});
      }
  })

router.route('/wells/:well_id/:report_type')
  
  // post report from an specific well
  .post(function(req, res){
    var wellId = Number(req.params.well_id);
    var reportType = req.params.report_type;
    
    if(tools.existsWell(wellId) !== -1){
      if(tools.validReportType(reportType)){

        res.json({'message': 'logic for well report POST'})

      } else {
        res.json({'message': 'This is not a valid report tyye'})
      }
 
    } else {
      res.json({'message': 'There is no well with that id. You can only request a report frmo an existing well'});
      }
  })

module.exports = router;