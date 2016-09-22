var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();
// postgres query helper 
var query = require('pg-query');

// on routes that end in /wells
// ----------------------------------------------------

router.route('/')
  // get all wells from a field
  .get(function(req, res) {
      var sql = 'SELECT * FROM WELLS'
      
      query(sql, [], function(err, result){
          if(err) return res.send(err);
          res.json(result);
      });
  })

  // creater new well
  .post(function(req, res){
      var sql = 'INSERT INTO WELLS (field_id,status,latitude, longitude,name) VALUES ($1,$2,$3,$4,$5) returning id;'
      
      query(sql, [req.body.field_id,req.body.status,req.body.latitude,req.body.longitude,req.body.name], function(err,results){
          if(err){
              if(err.code === "23503" && (err.detail.search('(field_id)') !== -1)) return res.json('There is no field with that id')
              if(err.code === "23503" && (err.detail.search('(status)') !== -1)) return res.json('There is no well status with that id');
              return res.send(err);
          }
          
          var response = results[0];
          response.message = 'Well created.';
          
          res.json(response);
          
      })
  })

router.route('/:well_id')
  // get an specific well
  .get(function(req, res){
      var sql = 'SELECT * FROM WELLS WHERE ID = $1'
      
      query(sql,[req.params.well_id], function(err, results){
          if(err) return res.send(err);
          
          var response = results[0];
          if(response === undefined) return res.json('There is no well with that id');
          res.send(response);
      })  
  })

  //update a well
  .put(function(req, res){
    var sql = 'SELECT * FROM wells WHERE id=$1';

    query(sql, [req.params.well_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};

      if(rows.length !== 0) {
        
        var sql2 = 'UPDATE wells SET (status, name) = ($2, $3) WHERE id=$1 returning *';
        
        var params = [
          req.params.well_id,
          req.body.status || rows[0].status,
          req.body.name || rows[0].name
        ];

        query(sql2, params, function(err2, rows2) {
          if (err2) return res.send(err2);

          response.message = "Well updated.";
          response.well = rows2[0];

          return res.json(response);
        });
      } else {
        return res.json({
          message: "There is no well with that id."
        });
      } 
    });
  })
module.exports = router;