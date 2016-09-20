  var express = require('express');
  var emergencies    = require('../../../data').emergencies;
  var wells = require('../../../data').wells;
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
      var id = Number(req.params.emergency_id);
      var exists = false;
      var i = -1;
      for(var i = 0; i < emergencies.length; i++) {
        if(emergencies[i].id === id){
          exists = true;
          break;
        }
      }

      if(exists){
        res.json(emergencies[i]);
      } else {
        res.json('There is no emergency with that id')
      }

    })

    //update a emergency
    .put(function(req, res) {
      var id = Number(req.params.emergency_id);
      var exists = false;
      var i = -1;

      for(var i = 0; i < emergencies.length; i++) {
        if(emergencies[i].id === id){
          exists = true;
          break;
        }
      }
      
      if(exists) {

        // update emergency data
        if(req.body.name) {
          emergencies[i].wellid = req.body.wellid;
        }
        if(req.body.type) {
          emergencies[i].type = req.body.type;
        }
        if(req.body.state) {
          emergencies[i].state = req.body.state;
        }

        res.json('Emergency updated.');
      } else {
        res.json('There is not an emergency with that id.');
      }
    })

    // delete a emergency
    .delete(function(req, res) {
      var id = Number(req.params.emergency_id);
      var exists = false;
      var i = -1;

      for(var i = 0; i < emergencies.length; i++) {
        if(emergencies[i].id === id){
          exists = true;
          break;
        }
      }
      
      if(exists) {
        emergencies.splice(i,1);

        res.json('Emergency deleted.');
      } else {
        res.json('There is not an emergency with that id.');
      }
    });

    module.exports = router;