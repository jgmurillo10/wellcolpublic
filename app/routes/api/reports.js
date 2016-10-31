var express = require('express');
// var reports    = require('../../../reports_data').reports;

var fields = require('../../../data').fields;
var wells = require('../../../data').wells;
var router = express.Router();
var query   = require('pg-query');

var report_types = require('../../modules/constants').report_types;
var tools = require('../../modules/Validator');
var reporter = require('../../modules/Reporter');

// on routes that end in /reports
// ----------------------------------------------------

// This code must be refactored to make use of the Factory Design Pattern 

router.route('/regions/:region/:report_type/')
  
  // get report from a region in an specified interval
  .get(function(req, res){

    var region = req.params.region;
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;

    if (reportType === 'energy' ||
        reportType === 'flow'  ||
        reportType === 'temperature') {

      var report = {};

      var sql = "select coalesce(" + (reportType === 'flow' ? "sum" : "avg") + "(sr.value),0) from regions r, sensor_types st, fields f, sensors s, wells w, sensor_records sr where s.well_id = w.id AND w.field_id = f.id AND r.name = $1 AND r.id = f.region AND st.name = $2 AND s.type = st.id AND sr.sensor_id = s.id AND sr.date > $3 AND sr.date < $4";

      var params = [region, reportType];

      if (!from && !to) {
        params.push(new Date(0));
        params.push(new Date());
      }
      if (from && !to) {
        params.push(from);
        params.push(new Date());
      }
      else if (!from && to) {
        params.push(new Date(0));
        params.push(to);
      }
      else if (from && to) {
        params.push(from);
        params.push(to);
      }

      query(sql, params, function(err, rows) {
        if (err) return res.send(err);

        report.value = rows[0].coalesce;
        
        res.json(report);
      });
    } else {
      res.json({ message: "No corresponde a un tipo de reporte." });
    }
  })

router.route('/fields/:field_id/:report_type/')

  // get report from a field in an specified interval
  .get(function(req, res){
    var fieldId = Number(req.params.field_id);
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;

    if (reportType === 'energy' ||
        reportType === 'flow'  ||
        reportType === 'temperature') {

      var report = {};

      var sql = "select coalesce(" + (reportType === 'flow' ? "sum" : "avg") + "(sr.value),0) from sensor_types st, fields f, sensors s, wells w, sensor_records sr where s.well_id = w.id AND w.field_id = f.id AND f.id = $1 AND st.name = $2 AND s.type = st.id AND sr.sensor_id = s.id AND sr.date > $3 AND sr.date < $4";

      var params = [fieldId, reportType];

      if (!from && !to) {
        params.push(new Date(0));
        params.push(new Date());
      }
      if (from && !to) {
        params.push(from);
        params.push(new Date());
      }
      else if (!from && to) {
        params.push(new Date(0));
        params.push(to);
      }
      else if (from && to) {
        params.push(from);
        params.push(to);
      }

      query(sql, params, function(err, rows) {
        if (err) return res.send(err);

        report.value = rows[0].coalesce;
        
        res.json(report);
      });
    } else {
      res.json({ message: "No corresponde a un tipo de reporte." });
    }
  })

router.route('/wells/:well_id/:report_type/')

  // get report from a well in an specified interval
  .get(function(req, res){
    var wellId = Number(req.params.well_id);
    var reportType = req.params.report_type;
    var from = req.query.from;
    var to = req.query.to;

    if (reportType === 'energy' ||
        reportType === 'flow'  ||
        reportType === 'temperature') {

      var report = {};

      var sql = "select coalesce(" + (reportType === 'flow' ? "sum" : "avg") + "(sr.value),0) from sensor_types st, sensors s, wells w, sensor_records sr where s.well_id = w.id AND w.id = $1 AND st.name = $2 AND s.type = st.id AND sr.sensor_id = s.id AND sr.date > $3 AND sr.date < $4";

      var params = [wellId, reportType];

      if (!from && !to) {
        params.push(new Date(0));
        params.push(new Date());
      }
      if (from && !to) {
        params.push(from);
        params.push(new Date());
      }
      else if (!from && to) {
        params.push(new Date(0));
        params.push(to);
      }
      else if (from && to) {
        params.push(from);
        params.push(to);
      }

      query(sql, params, function(err, rows) {
        if (err) return res.send(err);

        report.value = rows[0].coalesce;
        
        res.json(report);
      });
    } else {
      res.json({ message: "No corresponde a un tipo de reporte." });
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