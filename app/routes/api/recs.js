var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var password = 'cuandosientaelboom';
var input = 'hello world';


//funcions for existence validaton
var tools = require('../../modules/Validator');

// postgres query helper 
var query = require('pg-query');



// on routes that end in /recs

// ----------------------------------------------------

router.route('/')
.post(function(req,res){
	// var sensor_id=Number(req.body.sensor_id);
	// var date= req.body.date;
	// var value=Number(req.body.value);

    console.log('ho');
	var input=req.body.data;

    console.log(input);
	//crypto js implementation
	 // Convert urlsafe base64 to normal base64
    var input = input.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    var edata = new Buffer(input, 'base64').toString('binary')

    // Create key from password
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    // Decipher encrypted data
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10 
    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var decrypted, plaintext;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {  
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');    
        plaintext = new Buffer(decrypted, 'binary').toString('utf8');
    } else {
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }
    console.log('ho');
    console.log(plaintext);
    dataarray=plaintext.split("..");
    var date=dataarray[0];
    var sensor_id=dataarray[1];
    var value=dataarray[2];
    console.log(date+', '+sensor_id+', '+value);
    //end of crypto js implementation

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