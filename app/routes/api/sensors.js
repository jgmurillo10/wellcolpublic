var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();

//funcions for existence validaton
var tools = require('../../modules/Validator');

// postgres query helper 
var query = require('pg-query');



// on routes that end in /sensors
// ----------------------------------------------------
router.route('/')
 
  
  //get all sensors
  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    var wellId = Number(req.params.well_id);

    sql  = 'SELECT * FROM sensors';

    query(sql, function(err, result) {
      if (err) return res.send(err);
      res.json(result);

    });
  })

  // create new sensor
  .post(function(req, res){
    var wellId = req.body.well_id;
    var type = req.body.type;
    var rate = req.body.rate;

    sql = 'INSERT into sensors (well_id, type, rate) VALUES ($1, $2, $3) returning id;'
    
    query(sql,[wellId, type, rate] ,function(err, results) {
      if (err) {
        if(err.code === "23503" && (err.detail.search('(well_id)') !== -1)) return res.json('There is no well with that id');
        if(err.code === "23503" && (err.detail.search('(type)'   ) !== -1)) return res.json('There is no sensor type with that id');
        return res.send(err);
      }
      
      var response = results[0];
      response.message = 'Sensor created.';
      
      res.json(response);

    });

  })


router.route('/:sensor_id')
  
  //get an specific sensor
  .get(function(req, res){
    var sensorId = Number(req.params.sensor_id);
    sql = 'SELECT * FROM sensors where id=$1'

    query(sql, [sensorId], function(err, results) {
      
      if (err) return res.send(err);

      var response = results[0];

      if(response === undefined) return res.json('There is no sensor with that id');
      
      res.send(response);

    });

  })

  // update a sensor
  .put(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var sensorId = Number(req.params.sensor_id);
        var sensorIndex = tools.getSensorIndex(fieldId, wellId, sensorId);
        if(sensorIndex !== -1){
          var currentSensor = fields[fieldIndex].wells[wellIndex].sensors[sensorIndex];
          if(req.body.type){
            currentSensor.type = req.body.type;
          }
          if(req.body.rate){
            currentSensor.rate = req.body.rate;
          }

          res.json('Sensor updated');
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

  // delete a sensor

  .delete(function(req, res){
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        var sensorId = Number(req.params.sensor_id);
        var sensorIndex = tools.getSensorIndex(fieldId, wellId, sensorId);
        if(sensorIndex !== -1){
          
          fields[fieldIndex].wells[wellIndex].sensors.splice(sensorIndex, 1);
          res.json('Sensor deleted');
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