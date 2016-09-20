  var express = require('express');
  var router = express.Router();

  // Posgres database helper
  var query = require('pg-query');



  // on routes that end in /emergencies
  // ----------------------------------------------------
  router.route('/')

    //get all emergencies
    .get(function(req, res) {
      var sql = 'SELECT * FROM emergencies';
      query(sql, function(err, results){
        if(err) return res.json(err);

        res.send(results);
      });
    })

    //create new emergency
    .post(function(req, res) {

      var well_id = req.body.well_id;
      var state = req.body.state;
      var sql = 'INSERT into emergencies (well_id, state) VALUES($1, $2) returning id'
      query(sql, [well_id, state], function(err, results){
        if(err){
          if(err.code === "23503" && (err.detail.search('(well_id)')   !== -1)) return res.json('There is no well with that id');
          if(err.code === "23514" && (err.constraint.search('_state_') !== -1)) return res.json('There is no sensor type with that id');
          return res.send(err);
        }
        var response = results[0];
        response.message = 'Emergency saved';
        res.send(response);
      });

  })

    router.route('/:emergency_id')
    

    // get a emergency
    .get(function(req, res){
      var emergency_id = Number(req.params.emergency_id);
      sql = 'SELECT * FROM emergencies where id=$1'

      query(sql, [emergency_id], function(err, results) {
        if (err) return res.send(err);

        var response = results[0];
        if(response === undefined) return res.json('There is no emergency with that id');
        res.send(response);

      });
    })


    //update a emergency
    .put(function(req, res) {
      var emergency_id = Number(req.params.emergency_id);
      var sql = 'SELECT * FROM emergencies WHERE id=$1';
      query(sql, [emergency_id], function(err, rows) {
        if (err) return res.send(err);

        var response = {};
        if(rows.length !== 0) {
          
          var sql2 = 'UPDATE emergencies SET (well_id, state) = ($2, $3) WHERE id=$1 returning *';
          
          var params = [
            emergency_id,
            req.body.well_id || rows[0].well_id,
            req.body.state || rows[0].state
          ];

          query(sql2, params, function(err2, rows2) {
            if (err2) return res.send(err2);

            response.message = "Emergency updated.";
            response.user = rows2[0];

            return res.json(response);
          });

        } else {
          return res.json({
            message: "There is no emergency with that id."
          });
        }

        
      });

    })

    // delete a emergency
    .delete(function(req, res) {
      var emergency_id = Number(req.params.emergency_id);
      sql = 'DELETE FROM emergencies WHERE id=$1 returning *'
      query(sql, [emergency_id], function(err, results) {
        
        if (err) return res.send(err);

        var response = {};
        if(results.length === 0) {
          response.message = "There is no emergency with that id."
        } else {
          response.message = "Emergency deleted.";
          response.user = results[0];
        }

        res.json(response);

      });  

    });

    module.exports = router;