var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();

//funcions for existence validaton
var tools = require('../../modules/Validator');


// on routes that end in /sensors
// ----------------------------------------------------
router.route('/:field_id/wells/:well_id/sensors')

  //get all sensors
  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    var fieldIndex = tools.getFieldIndex(fieldId);
    if( fieldIndex !== -1){
      var wellId = Number(req.params.well_id);
      var wellIndex = tools.getWellIndex(fieldId, wellId);
      if(wellIndex !== -1){
        console.log('gets here');
        res.json(fields[fieldIndex].wells[wellIndex].sensors);

      }else {
        res.json('There is no well with that id');
      }


    } else {
      res.json('There is no field with that id');
    }    



  })
    



module.exports = router;