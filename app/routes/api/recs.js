var express = require('express');
var router = express.Router();


//funcions for existence validaton
var tools = require('../../modules/Validator');

// postgres query helper 
var query = require('pg-query');



// on routes that end in /recs

// ----------------------------------------------------

router.route('/')
.post(function(req,res){
	var sensor_id=Number(req.body.sensor_id);
	var date= req.body.date;
	var value=Number(req.body.value);
	// var unit=req.body.unit;

	var sql='insert into sensor_records (date, sensor_id, value) values ($1, $2, $3) returning *;'
	 query(sql, [date, sensor_id, value], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'Record created.';

      res.json(response);
    });

})






module.exports = router;