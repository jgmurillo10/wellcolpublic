  var express = require('express');
  var fields = require('../../../data').fields;
  var router = express.Router();

// on routes that end in /fields
  // ----------------------------------------------------
  router.route('/')
  
  //get all fieldss
    .get(function(req, res) {
      res.json(fields);
    })
    
    //create new field
    .post(function(req, res) {
    var bigId = -1;
    for (var i = 0; i < fields.length; i++) {
      if(fields[i].id > bigId){
        bigId = fields[i].id;
      }
        }
        //add sensor into sensors array
        fields.push({
          'id': bigId + 1,
          'name': req.body.name
        });
      res.json('Field created.'); 
    })
    
    router.route('/:field_id')
    
    // get a field
  .get(function(req, res) {
    var id = req.params.field_id;
    var found = false;

    var i = 0;
    for (; i < fields.length; i++) {
      if(fields[i].id === id) {
        found = true;
        break;
      }
    }

    if(found) {
      res.json(fields[i]);
    } else {
      res.json('There is not a field with that id.');
    }
  })

  // Update a field
  .put(function(req, res) {

    var id = req.params.field_id;
    var found = false;

    var i = 0;
    for (; i < fields.length; i++) {
      if(fields[i].id === id) {
        found = true;
        break;
      };
    }
    
    if(found) {
      // update field data
      if(req.body.name) {
        fields[i].name = req.body.name;
      }
      res.json('Field updated.');
    } else {
      res.json('There is not a field with that id.');
    }
  })

  .delete(function(req, res) {
    var id = req.params.field_id;
    var found = false;

    var i = 0;
    for (; i < fields.length; i++) {
      if(fields[i].id === id) {
        found = true;
        break;
      };
    }
    
    if(found) {
      fields.splice(i,1);

      res.json('Field deleted.');
    } else {
      res.json('There is not a field with that id.');
    }
  })

module.exports = router;