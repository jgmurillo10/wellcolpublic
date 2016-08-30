// arrays for validation
var regions = require('./types').regions;
var report_types = require('./types').report_types;

module.exports = {

  // functions for validation
  parseDate : function (input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  },


  validRegion: function (region) {
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
  }
}
