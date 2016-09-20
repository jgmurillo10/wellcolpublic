  var express = require('express');
  var fields = require('../../../data').fields;
  var router = express.Router();
  var query   = require('pg-query');

// on routes that end in /fields
  // ----------------------------------------------------
  router.route('/')
  
  //get all fields
    .get(function(req, res) {
       var sql = 'select * from fields';
       
       query(sql, [], function(err, rows) {
       if (err) return res.send(err);
       
       res.json(rows);
       });
   })     
   
 
    //create new field
    .post(function(req, res) {

    var sql = 'insert into fields (name, region) values ($1, $2) returning id;';

    query(sql, [req.body.name, req.body.region], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'Field created.';

      res.json(response);
    });
  })
    
    router.route('/:field_id')
    
    // get a field
  .get(function(req, res) {
    
    var sql = 'select * from fields where id=$1';

    query(sql, [req.params.field_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};
      console.log(rows.length);

      if(rows.length === 0) {
        response.message = "There is no field with that id."
      } else {
        response.field = rows[0];
      }

      res.json(response);
    });
  })

  // Update a field
  .put(function(req, res) {
    var sql = 'update fields set(name) =($2) where id=$1 returning *';

    query(sql, [req.params.field_id, req.body.name], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'Field updated.';

      res.json(response);
    });
  })

  .delete(function(req, res) {

    var sql = 'delete from fields where id=$1 returning *';

    query(sql, [req.params.field_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};
      console.log(rows.length);

      if(rows.length === 0) {
        response.message = "There is no field with that id."
      } else {
        response.message = "Field deleted.";
        response.field = rows[0];
      }

      res.json(response);
    });
  })

module.exports = router;