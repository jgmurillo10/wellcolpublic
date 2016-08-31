var express = require('express');
var sensors    = require('../../../data').sensors;
var wells = require('../../../data').wells;
var router = express.Router();

//funcions for existence validaton
var tools = require('../../../tools');


// on routes that end in /sensors
// ----------------------------------------------------
router.route('/')

//get all sensors
.get(function(req, res) {
  res.json(sensors);
})

//create new sensor
.post(function(req, res) {

  var wellIndex = tools.existsWell(req.body.wellid);
  if(wellIndex !== -1){
    var bigId = -1;
    for (var i = 0; i < sensors.length; i++) {
      if(sensors[i].id > bigId){
        bigId = sensors[i].id;
      }
    }


  //add sensor to the well with id=wellid
  wells[wellIndex].sensors.push({
    'id': bigId + 1,
    'wellid': req.body.wellid,
    'type': req.body.type,
    'rate': req.body.rate
  })

  //add sensor into sensors array
  sensors.push({
    'id': bigId + 1,
    'wellid': req.body.wellid,
    'type': req.body.type,
    'rate': req.body.rate
  });
  res.json('Sensor created.'); 
} else {
  res.json('There is no well with that id. You can only add a sensor to an exiting well');
}

})

router.route('/:sensor_id')


// get a sensor
.get(function(req, res){
  var id = Number(req.params.sensor_id);
  var exists = false;
  var i = -1;
  for(var i = 0; i < sensors.length; i++) {
    if(sensors[i].id === id){
      exists = true;
      break;
    }
  }

  if(exists){
    res.json(sensors[i]);
  } else {
    res.json('There is no sensor with that id')
  }

})

//update a sensor
.put(function(req, res) {
  var id = Number(req.params.sensor_id);
  var exists = false;
  var i = -1;

  for(var i = 0; i < sensors.length; i++) {
    if(sensors[i].id === id){
      exists = true;
      break;
    }
  }
  
  if(exists) {

    // update sensor data
    if(req.body.name) {
      sensors[i].wellid = req.body.wellid;
    }
    if(req.body.type) {
      sensors[i].type = req.body.type;
    }
    if(req.body.rate) {
      sensors[i].rate = req.body.rate;
    }

    res.json('Sensor updated.');
  } else {
    res.json('There is not a sensor with that id.');
  }
})

// delete a sensor
.delete(function(req, res) {
  var id = Number(req.params.sensor_id);
  var exists = false;
  var i = -1;

  for(var i = 0; i < sensors.length; i++) {
    if(sensors[i].id === id){
      exists = true;
      break;
    }
  }
  
  if(exists) {
    sensors.splice(i,1);

    res.json('Sensor deleted.');
  } else {
    res.json('There is not a sensor with that id.');
  }
});

module.exports = router;