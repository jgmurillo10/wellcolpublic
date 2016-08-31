var express = require('express');
var fields = require('../../../data').fields;
var router = express.Router();
var tools = require('../../../tools');

// on routes that end in /wells
// ----------------------------------------------------

router.route('/:field_id/wells')
// get all wells from a field

  .get(function(req, res) {
    var fieldId = Number(req.params.field_id);
    console.log(fieldId);
    var fieldIndex = tools.getIndexField(fieldId);
    if( fieldIndex !== -1){
      res.json(fields[fieldIndex].wells);
    } else {
      res.json('There is no field with that id');
    }
    
  })

// creater new well
.post(function(req, res){
	



  var id = req.body.id;
	var exists=false;
	for (var i = 0; i < wells.length; i++) {
		if(wells[i].id==id){
			exists=true;
			break;
		};
	}
	if(!exists){
		//add well into wells array
		wells.push({

		'name': req.body.name,
        'status': req.body.status,
        'id': req.body.id,
        'region': req.body.region,
        'field': req.body.field

		});
		res.json('Well created. ');
	}else{
		res.json('There already is a well with that id');
	}
})

router.route('/:well_id')

//get well by id

.get(function(req,res){
	var id= req.params.well_id;
	var i=-1;
	console.log(wells.length);
	for ( i++; i < wells.length; i++) {
      if(wells[i].id == id) {
       	break;
      }
      else if(i==wells.length-1){
      	i=-1;
      	break;
      }
    }
    if(i!=-1)
    	res.json(wells[i]);
    else{

    res.json('There is not a well with that id.');
    	
    }
})


//update a well

.put(function(req,res){

	var id = req.params.well_id;
    var i = -1;

    for (i++; i < wells.length; i++) {
      if(wells[i].id == id) {
       	break;
      }
      else if(i==wells.length-1){
      	i=-1;
      	break;
      }
    }
    
    if(i !== -1) {

      // update well data
      if(req.body.name) {
        wells[i].name = req.body.name;
      }
      if(req.body.status) {
        wells[i].status = req.body.status;
      }
      if(req.body.field) {
        wells[i].field = req.body.field;
      }
      if(req.body.region) {
        wells[i].region  = req.body.region;
      }

      res.json('Well updated.');
    } else {
      res.json('There is not a well with that id.');
    }
	})



  .delete(function(req, res) {
  	var id = req.params.well_id;
    var i = -1;

    for (i++; i < wells.length; i++) {
      if(wells[i].id == id) {
       	break;
      }
      else if(i==wells.length-1){
      	i=-1;
      	break;
      }
    }
    
    if(i !== -1) {
      wells.splice(i,1);

      res.json('Well deleted.');
    } else {
      res.json('There is not a well with that id.');
    }
  })

module.exports = router;