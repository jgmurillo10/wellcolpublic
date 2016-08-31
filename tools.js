// arrays for validation
var regions = require('./types').regions;
var report_types = require('./types').report_types;
var fields = require('./data').fields;
var users = require('./data').users;
var sensors = require('./data').sensors;
var wells = require('./data').wells;

module.exports = {

  // functions for date parsing

  parseDate : function (input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  },

  getTimestamp: function(dateString) {
    var date = parseDate(dateString);
    return date.getTime();
  },

  // functions for existance

  existsRegion: function (region) {
    for(var i  = 0; i < regions.length; i++ ){
      if(regions[i] === region){
        return true;
      }
    }
    return false;
  },


  validReportType: function (reportType){
    for(var i  = 0; i < report_types.length; i++ ){
      if(report_types[i] === reportType){
        return true;
      }
    }
    return false;
  },

  existsUser: function(userId){
    for(var i  = 0; i < users.length; i++ ){
      if(users[i].id === userId){
        return true;
      }
    }
    return false;
  },

  existsSensor: function(sensorId){
    for(var i  = 0; i < sensors.length; i++ ){
      if(sensors[i].id === sensorId){
        return true;
      }
    }
    return false;

  },

  // returns the index wehere the well is, -1 if it does not exists
  existsWell: function(wellId){
    for(var i  = 0; i < wells.length; i++ ){
      if(wells[i].id === wellId){
        return i;
      }
    }
    return -1;

  },

  existsField: function (fieldId) {
    for(var i  = 0; i < fields.length; i++ ){
      if(fields[i].id === fieldId){
        return true;
      }
    }
    return false;
  },

  // functions for finding the index in the data arrrays
  // returns the index wehere the well is, -1 if it does not exists

  getIndexUser: function(userId){
    for(var i  = 0; i < users.length; i++ ){
      if(users[i].id === userId){
        return i;
      }
    }
    return -1;
  },

  getIndexSensor: function(sensorId){
    for(var i  = 0; i < sensors.length; i++ ){
      if(sensors[i].id === sensorId){
        return i;
      }
    }
    return -1;

  },

  
  getIndexWell: function(wellId){
    for(var i  = 0; i < wells.length; i++ ){
      if(wells[i].id === wellId){
        return i;
      }
    }
    return -1;

  },

  getIndexField: function (fieldId) {
    for(var i  = 0; i < fields.length; i++ ){
      if(fields[i].id === fieldId){
        return i;
      }
    }
    return -1;
  }


}
