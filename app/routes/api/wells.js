var express = require('express');
var wells = require('../../../data').wells;
var router = express.Router();

// on routes that end in /wells
// ----------------------------------------------------
router.route('/')


// get all wells
  .get(function(req, res) {
    res.json(wells);
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
        'id': req.body.id

		});
		res.json('Well created. ');
	}else{
		res.json('There already is a well with that id');
	}
})

router.route('/:well_id')

//get well by id

.get(function(req,res){
	var id= req.params.tran_id;
	var i=-1;
	for (var i = 0; i < wells.length; i++) {
      if(wells[i].id === id) {
        break;
      };
    }

    if(i !== -1) {
      res.json(wells[i]);
    } else {
      res.json('There is not a well with that id.');
    }
})


//update a well

.put(function(req,res){

	var id = req.params.tran_id;
    var i = -1;

    for (var i = 0; i < wells.length; i++) {
      if(wells[i].id === id) {
        break;
      };
    }
    
    if(i !== -1) {

      // update well data
      if(req.body.name) {
        wells[i].name = req.body.name;
      }
      if(req.body.status) {
        wells[i].status = req.body.status;
      }

      res.json('Well updated.');
    } else {
      res.json('There is not a well with that id.');
    }
	})



  .delete(function(req, res) {
  	var id = req.params.tran_id;
    var i = -1;

    for (var i = 0; i < wells.length; i++) {
      if(wells[i].id === id) {
        break;
      };
    }
    
    if(i !== -1) {
      someArray.splice(i,1);

      res.json('Well deleted.');
    } else {
      res.json('There is not a well with that id.');
    }
  })

module.exports = router;