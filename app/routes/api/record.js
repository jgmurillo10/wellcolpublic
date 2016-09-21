var express = require('express');
var router = express.Router();

//functions for existence validation
var tools = require('../../modules/Validator');

//portgres query helper
var query = require('pg-query');



//on router that end in /sensors/:sensor_id/records
// -----------------------------------------------------------------
router.route('/sensors/:sensor_id/')


//get all records

.get(function(req,res){
	sql = 'SELECT * FROM records';

	query(sql, function(err, resutl){
		if(err) return res.send(err);
		res.json(result);
	});
})
