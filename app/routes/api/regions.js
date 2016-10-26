var express = require('express');
var router = express.Router();

// Posgres database helper
  var query = require('pg-query');

// on routes that end in /regions
// ----------------------------------------------------
router.route('/')

  // get all region
  .get(function(req, res) {
    var sql = 'SELECT * FROM regions';
      query(sql, function(err, results){
        if(err) return res.json(err);

        res.send(results);
      });
  })

  // create new region
  .post(function(req, res) {
    var name = req.body.name;
    var sql = 'INSERT into regions (name) VALUES($1) returning id'
      query(sql, [name], function(err, results){
        if(err){
          if(err.code === "23505" && (err.detail.search('already exists')   !== -1)) return res.json('A region with that name already exists');
          return res.send(err);
        }
        var response = results[0];
        response.message = 'Region saved';
        res.send(response);
      });
    
  })

router.route('/:region_id')

  // get region by id
  .get(function(req, res) {
    var region_id = Number(req.params.region_id);
      sql = 'SELECT * FROM regions where id=$1'

      query(sql, [region_id], function(err, results) {
        if (err) return res.send(err);

        var response = results[0];
        if(response === undefined) return res.json('There is no region with that id');
        res.send(response);

      }); 
   

  })

  // update region
  .put(function(req, res) {
    var region_id = Number(req.params.region_id);
      var sql = 'SELECT * FROM regions WHERE id=$1';
      query(sql, [region_id], function(err, rows) {
        if (err) return res.send(err);

        var response = {};
        if(rows.length !== 0) {
          
          var sql2 = 'UPDATE regions SET (name) = ($2) WHERE id=$1 returning *';
          
          var params = [
            region_id,
            req.body.name || rows[0].name
          ];

          query(sql2, params, function(err2, rows2) {
            if (err2) return res.send(err2);

            response.message = "Region updated.";
            response.user = rows2[0];

            return res.json(response);
          });

        } else {
          return res.json({
            message: "There is no region with that id."
          });
        }

        
      });
  })

  .delete(function(req, res) {
    var region_id = Number(req.params.region_id);
      sql = 'DELETE FROM regions WHERE id=$1 returning *'
      query(sql, [region_id], function(err, results) {
        
        if (err) return res.send(err);

        var response = {};
        if(results.length === 0) {
          response.message = "There is no region with that id."
        } else {
          response.message = "Region deleted.";
          response.user = results[0];
        }

        res.json(response);

      });
  })

  // fields in regions
  router.route('/:region_id/fields')

  // get fields by  region
  .get(function(req, res) {
    var region_id = Number(req.params.region_id);
      sql = 'SELECT * FROM fields where region=$1'

      query(sql, [region_id], function(err, results) {
        if (err) return res.send(err);

        if(results.length === 0){
          res.json('There are no fields in that region');
        }

        res.json(results);
      }); 
  })

  router.route('/:region_id/fields/:field_id/wells')

  .get(function(req, res) {
    var region_id = Number(req.params.region_id);
    var field_id = Number(req.params.field_id);
      sql = 'SELECT wells.id,wells.status, wells.name, wells.latitude, wells.longitude, wells.field_id '; 
      sql += 'FROM fields, wells WHERE wells.field_id = fields.id AND wells.field_id = $1 AND fields.region = $2';

      query(sql, [field_id, region_id], function(err, results) {
        if (err) return res.send(err);

        if(results.length === 0){
          res.json('There are no wells in that field');
        }
        res.json(results);
      }); 
  })




module.exports = router;