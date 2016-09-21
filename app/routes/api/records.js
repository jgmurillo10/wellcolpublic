var express = require('express');
var router = express.Router();

//funcions for existence validaton
var tools = require('../../modules/Validator');

// postgres query helper 
var query = require('pg-query');



// on routes that end in /records
// ----------------------------------------------------
router.route('/:sensor_id/records')
 
  
  //get all sensors
 .get(function(req, res){
    var sensor_id = Number(req.params.sensor_id);

    sql2 = 'SELECT * FROM sensor_records WHERE sensor_id=$1 '

    sql = 'SELECT * FROM sensor_records  '

    query(sql, function(err, results) {
      
      if (err) return res.send(err);
       var response = results[0];
      if(response === undefined) return res.json('There is no sensor records');
      res.json(response);

    });

  })
 // post a sensor's record
    .post(function(req, res) {	
    	var sensorid=Number(req.params.sensor_id);
    	var value=Number(req.body.temperature.data);
    	var date=req.body.protime;
    var sql = 'insert into sensor_records (date, sensor_id, value) values ($1, $2, $3) returning *;';

    query(sql, [date, sensorid, value], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'Record created.';

      res.json(response);
    });
  })
// .post(function(req, res){

//     var sensor_id = Number(req.params.sensor_id);
//     var params = [
//     	req.body.date,
//     	sensor_id,
//     	req.body.value

//     ];
//     var sql ='INSERT sensor_records SET (date, sensor_id, value) = ($1, $2, $3) returning *';

//    query(sql,params,function(err,rows){
//    	if(err) return res.send(err);
//    	response.message = "record posted";
//    	response.user = rows[0];

//    	return res.json(respose);
//    });




module.exports = router;