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

    query(sql2,[sensor_id], function(err, results) {
      
      if (err) return res.send(err);
       var response = results;
      if(response === undefined) return res.json('There is no sensor records');
      res.json(response);

    });

  })
 // post a sensor's record
    .post(function(req, res) {	
    	var sensorid=Number(req.params.sensor_id);

if(sensorid==3){

	var value=Number(req.body.temperature.dataTemp);
	
}else if(sensorid==18){
var value=Number(req.body.temperature.dataPot1);
}else if(sensorid==19){
var value=Number(req.body.temperature.dataPot2);
}else if(sensorid==20){
var value=req.body.temperature.dataPulser;
}
	var date=req.body.protime;
    var sql = 'insert into sensor_records (date, sensor_id, value) values ($1, $2, $3) returning *;';

    query(sql, [date, sensorid, value], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'Record created.';

      res.json(response);
    });

    	
  })





module.exports = router;