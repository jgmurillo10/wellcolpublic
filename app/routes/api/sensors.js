var express = require('express');
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

    var sensor_id = Number(req.params.sensor_id);
    var sql = 'select * from sensors where id=$1';

    query(sql, [sensor_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};

      if(rows.length !== 0) {
        
        var sql2 = 'update sensors set (well_id, type, rate) = ($2, $3, $4) where id=$1 returning *';
        
        var params = [
          sensor_id,
          req.body.well_id || rows[0].well_id,
          req.body.type || rows[0].type,
          req.body.rate || rows[0].rate
        ];

        query(sql2, params, function(err2, rows2) {
          if (err2) return res.send(err2);

          response.message = "Sensor updated.";
          response.user = rows2[0];

          return res.json(response);
        });

      } else {
        return res.json({
          message: "There is no sensor with that id."
        });
      }

      
    });

  })

  // delete a sensor

  .delete(function(req, res){
    var sensorId = Number(req.params.sensor_id);
    sql = 'DELETE FROM sensors where id=$1 returning *'

    query(sql, [sensorId], function(err, results) {
      
      if (err) return res.send(err);

      var response = {};
      if(results.length === 0) {
        response.message = "There is no sensor with that id."
      } else {
        response.message = "Sensor deleted.";
        response.user = results[0];
      }

      res.json(response);

    });    

  })
    



module.exports = router;