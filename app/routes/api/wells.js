var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();
var tools = require('../../modules/Validator');

// on routes that end in /wells
// ----------------------------------------------------

router.route('/:field_id/wells')
// get all wells from a field

  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getIndexField(fieldId);
    if( fieldIndex !== -1){
      res.json(fields[fieldIndex].wells);
    } else {
      res.json('There is no field with that id');
    }
    
  })

// creater new well
.post(function(req, res){
	var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getIndexField(fieldId);
    if( fieldIndex !== -1){
      var id  = fields[fieldIndex].wells.length - 1;
      var newWell = {
        'id': id,
        'status' : req.body.status,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'sensors': []
      }

      fields[fieldIndex].wells.push(newWell);
      res.json(newWell);
    } else {
      res.json('There is no field with that id');
    }

})



module.exports = router;