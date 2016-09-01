var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();
var tools = require('../../modules/Validator');

// on routes that end in /wells
// ----------------------------------------------------

router.route('/:field_id/wells')
  // get all wells from a field
  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      res.json(fields[fieldIndex].wells);
    } else {
      res.json('There is no field with that id');
    }
    
  })

  // creater new well
  .post(function(req, res){
  	var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var id  = fields[fieldIndex].wells.length + 1;
      var newWell = {
        'id': id,
        'status' : req.body.status,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'sensors': []
      }

      fields[fieldIndex].wells.push(newWell);
      res.json(newWell);
    } else {
      res.json('There is no field with that id');
    }

  })

router.route('/:field_id/wells/:well_id')
  // get an specific well
  .get(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    console.log(fieldIndex);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        res.json(fields[fieldIndex].wells[wellIndex]);
      } else {
        res.json('there is no well with that id');
      }
    } else {
      res.json('There is no field with that id');
    }
  })

  //update a well
  .put(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var currentWell = fields[fieldIndex].wells[wellIndex];
        if(req.body.status){
          currentWell.status = req.body.status;
        }
        res.json('Well updated');
      } else {
        res.json('there is no well with that id');
      }
    } else {
      res.json('There is no field with that id');
    }

  })

  //delete a well
  .delete(function(req,res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){

      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var currentWell = fields[fieldIndex].wells.splice(wellIndex, 1);
        res.json('Well deleted');
      } else {
        res.json('there is no well with that id');
      }
    } else {
      res.json('There is no field with that id');
    }
  })




module.exports = router;