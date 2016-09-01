var express = require('express');
var zones    = require('../../../data').zones;

var router = express.Router();

// on routes that end in /zones
// ----------------------------------------------------
router.route('/')

  // get all zones
  .get(function(req, res) {
    res.json(zones);
  })

  // create new zone
  .post(function(req, res) {

    var id = req.body.id;
    var exists = false;

    for (var i = 0; i < zones.length; i++) {
      if(zones[i].id === id) {
        exists = true;
        break;
      };
    }
    
    if(!exists) {
      // add zone into zones array
      zones.push({
        'name': req.body.name,
        'id': req.body.id
      });

      res.json('Zone created.');
    } else {
      res.json('There already is a zone with that id.');
    }
  })

router.route('/:zone_id')

  // get zone by id
  .get(function(req, res) {
    
     var id = req.params.zone_id;
    var found = false;

    var i = 0;
    for (; i < zones.length; i++) {
      if(zones[i].id == id) {
        found = true;
        break;
      }
    }

    if(found) {
      res.json(zones[i]);
    } else {
      res.json('There is not a field with that id.');
    }

  })

  // update zone
  .put(function(req, res) {

    var id = req.params.zone_id;
    var found = false;

    var i = 0;
    for (; i < zones.length; i++) {
      if(zones[i].id == id) {
        found = true;
        break;
      }
    }

    
    if(found) {

      // update zone data
      if(req.body.name) {
        zones[i].name = req.body.name;
      }
     

      res.json('Zone updated.');
    } else {
      res.json('There is not a Zone with that id.');
    }
  })

  .delete(function(req, res) {

    var id = req.params.zone_id;
    var found = false;

    var i = 0;
    for (; i < zones.length; i++) {
      if(zones[i].id == id) {
        found = true;
        break;
      };
    }
    
    if(found) {
      zones.splice(i,1);

      res.json('Zone deleted.');
    } else {
      res.json('There is not a Zone with that id.');
    }
  })

module.exports = router;