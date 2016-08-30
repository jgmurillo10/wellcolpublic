  var express = require('express');
  var emergencies    = require('../../../data').emergencies;
  var wells = require('../../../data').wells;
  var router = express.Router();

  // on routes that end in /emergencies
  // ----------------------------------------------------
  router.route('/')

    //get all emergencies
    .get(function(req, res) {
      res.json(emergencies);
    })

    //create new emergency
    .post(function(req, res) {

      var wellid = req.body.wellid;
      var wellExists = false;
      for (var j = 0; j < wells.length; j++) {
        if(wells[j].id === wellid){
          wellExists = true;
          break;
        }
      }

      if(wellExists){
        var bigId = -1;
        for (var i = 0; i < emergencies.length; i++) {
          if(emergencies[i].id > bigId){
            bigId = emergencies[i].id;
          }
        }
      //add emergency into emergencies array
      emergencies.push({
        'id': bigId + 1,
        'wellid': req.body.wellid,
        'type': req.body.type,
        'state': req.body.state
      });
      res.json('emergency notified.'); 
    } else {
      res.json('There is no well with that id. You can only notify an emergency from an exiting well');
    }

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