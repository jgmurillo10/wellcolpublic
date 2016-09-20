var express = require('express');
var router = express.Router();

// Posgres database helper
  var query = require('pg-query');

// on routes that end in /zones
// ----------------------------------------------------
router.route('/')

  // get all zones
  .get(function(req, res) {
    var sql = 'SELECT * FROM regions';
      query(sql, function(err, results){
        if(err) return res.json(err);

        res.send(results);
      });
  })

  // create new zone
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