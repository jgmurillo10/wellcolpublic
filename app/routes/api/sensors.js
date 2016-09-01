var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();

//funcions for existence validaton
var tools = require('../../modules/Validator');


// on routes that end in /sensors
// ----------------------------------------------------
router.route('/:field_id/wells/:well_id/sensors')

  //get all sensors
  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        res.json(fields[fieldIndex].wells[wellIndex].sensors);

      }else {
        res.json('There is no well with that id');
      }


    } else {
      res.json('There is no field with that id');
    }    



  })

  // create new sensor
  .post(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var id = fields[fieldIndex].wells[wellIndex].sensors.length + 1;
        var newSensor = {
          'id': id,
          'type': req.body.type,
          'rate': req.body.rate,
          'records': []
        }
        fields[fieldIndex].wells[wellIndex].sensors.push(newSensor);
        res.json(newSensor);
      }else {
        res.json('There is no well with that id');
      }
      

    } else {
      res.json('There is no field with that id');
    }

  })

router.route('/:field_id/wells/:well_id/sensors/:sensor_id')
  
  //get an specific sensor
  .get(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var sensorId = Number(req.params.sensor_id);
        var sensorIndex = tools.getSensorIndex(fieldId, wellId, sensorId);
        if(sensorIndex !== -1){

          res.json(fields[fieldIndex].wells[wellIndex].sensors[sensorIndex]);

        } else {
          res.json('There is no sensor with that id');
        }


      }else {
        res.json('There is no well with that id');
      }
      

    } else {
      res.json('There is no field with that id');
    }

  })

    



module.exports = router;