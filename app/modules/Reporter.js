// arrays for validation

var regions = require('./constants').regions;
var report_types = require('./constants').report_types;
var sensor_types = require('./constants').sensor_types;
var well_status = require('./constants').well_status;
var report_to_sensor = require('./constants').report_to_sensor;
// var report_types = require('../../constants').report_entities;

var fields = require('../../data').fields;
var users = require('../../data').users;
var emergencies = require('../../data').emergencies;

var ReportMaker = {}

ReportMaker.getFieldFlowReport = function(field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    if (fields[i].id === field_id) {
      found = true;

      report.data = 0.0;

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {

        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {

            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['FLOW']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {

                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  report.data += sensor.records[l].value;
                }
              }
            }
          }
        }
      }
      break;
    }
  }

  if(!found) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getFieldEnergyReport = function(field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    if (fields[i].id === field_id) {
      found = true;

      report.data = 0.0;
      var num = 0.0; // cantidad de datos

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {

        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {

            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['ENERGY']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {

                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  report.data += sensor.records[l].value;
                  num++;
                }
              }
            }
          }
        }
      }

      report.data /= (num == 0 ? 1 : num);
      break;
    }
  }

  if(!found) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getFieldTempReport = function(field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    if (fields[i].id === field_id) {
      found = true;

      report.data = 0.0;
      var num = 0.0; // cantidad de datos

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {

        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {

            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['TEMPERATURE']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {

                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  report.data += sensor.records[l].value;
                  num++;
                }
              }
            }
          }
        }
      }

      report.data /= (num == 0 ? 1 : num);
      break;
    }
  }

  if(!found) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getWellFlowReport = function(well_id, field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found_field = false;

  for (var i = fields.length - 1; i >= 0; i--) {

    if (fields[i].id === field_id) {
      found_field = true;
      var field = fields[i];
      var found_well = false;
      for (var j = field.wells.length - 1; j >= 0; j--) {

        if(field.wells[j].id === well_id) {
          var found_well = true;
          var well = field.wells[j];

          report.data = 0.0;

          if (well.status === well_status['PRODUCTION']) {
            for (var k = well.sensors.length - 1; k >= 0; k--) {

              var sensor = well.sensors[k];
              if (sensor.type === sensor_types['FLOW']) {
                for (var l = sensor.records.length - 1; l >= 0; l--) {

                  if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                    report.data += sensor.records[l].value;
                  }
                }
              }
            }
          }
          break;
        }
      }

      if(!found_well) {
        report.message = 'ERORR: No well has been found with this id in the field.';
      }

      break;
    }
  }

  if(!found_field) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getWellEnergyReport = function(well_id, field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found_field = false;

  for (var i = fields.length - 1; i >= 0; i--) {

    if (fields[i].id === field_id) {
      found_field = true;
      var field = fields[i];
      var found_well = false;
      for (var j = field.wells.length - 1; j >= 0; j--) {

        if(field.wells[j].id === well_id) {
          var found_well = true;
          var well = field.wells[j];

          report.data = 0.0;
          var num = 0.0;

          if (well.status === well_status['PRODUCTION']) {
            for (var k = well.sensors.length - 1; k >= 0; k--) {

              var sensor = well.sensors[k];
              if (sensor.type === sensor_types['ENERGY']) {
                for (var l = sensor.records.length - 1; l >= 0; l--) {

                  if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                    report.data += sensor.records[l].value;
                    num++;
                  }
                }
              }
            }
          }

          report.data /= (num == 0 ? 1 : num);
          break;
        }
      }

      if(!found_well) {
        report.message = 'ERORR: No well has been found with this id in the field.';
      }

      break;
    }
  }

  if(!found_field) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getWellTempReport = function(well_id, field_id, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found_field = false;

  for (var i = fields.length - 1; i >= 0; i--) {

    if (fields[i].id === field_id) {
      found_field = true;
      var field = fields[i];
      var found_well = false;
      for (var j = field.wells.length - 1; j >= 0; j--) {

        if(field.wells[j].id === well_id) {
          var found_well = true;
          var well = field.wells[j];

          report.data = 0.0;
          var num = 0.0;

          if (well.status === well_status['PRODUCTION']) {
            for (var k = well.sensors.length - 1; k >= 0; k--) {

              var sensor = well.sensors[k];
              if (sensor.type === sensor_types['TEMPERATURE']) {
                for (var l = sensor.records.length - 1; l >= 0; l--) {

                  if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                    report.data += sensor.records[l].value;
                    num++;
                  }
                }
              }
            }
          }

          report.data /= (num == 0 ? 1 : num);
          break;
        }
      }

      if(!found_well) {
        report.message = 'ERORR: No well has been found with this id in the field.';
      }

      break;
    }
  }

  if(!found_field) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}

ReportMaker.getRegionFlowReport = function(region_name, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    if (fields[i].region === regions[region_name]) {
      found = true;

      report.data = 0.0;

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {
console.log('c');
        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {
console.log('b');
            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['FLOW']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {
                console.log('a');
                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  report.data += sensor.records[l].value;
                }
              }
            }
          }
        }
      }
      break;
    }
  }

  if(!found) {
    report.message = 'ERORR: No region has been found with this id.';
  }

  return report;
}

ReportMaker.getRegionEnergyReport = function(region_name, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    console.log(fields[i].region);
    if (fields[i].region === regions[region_name]) {
      found = true;

      report.data = 0.0;
      var num = 0.0; // cantidad de datos

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {
        console.log('.');
        console.log(report.data);
        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {
            console.log('a');

            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['ENERGY']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {
                console.log('b');

                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  console.log('c');
                  report.data += sensor.records[l].value;
                  num++;
                }
              }
            }
          }
        }
      }

      report.data /= (num == 0 ? 1 : num);
      break;
    }
  }

  if(!found) {
    report.message = 'No fields match.';
  }

  return report;
}

ReportMaker.getRegionTempReport = function(region_name, type, fromStr, toStr) {

  var from = Date.parse(fromStr || '1969-12-31T19:00:00-05:00');
  var to = (toStr ? Date.parse(toStr) : new Date());

  var report = {};
  var found = false;

  for (var i = fields.length - 1; i >= 0; i--) {
    if (fields[i].region === regions[region_name]) {
      found = true;

      report.data = 0.0;
      var num = 0.0; // cantidad de datos

      var field = fields[i];

      for (var j = field.wells.length - 1; j >= 0; j--) {

        var well = field.wells[j];
        if (well.status === well_status['PRODUCTION']) {
          for (var k = well.sensors.length - 1; k >= 0; k--) {

            var sensor = well.sensors[k];
            if (sensor.type === sensor_types['TEMPERATURE']) {
              for (var l = sensor.records.length - 1; l >= 0; l--) {

                if(from <= Date.parse(sensor.records[l].date) && Date.parse(sensor.records[l].date) <= to) {
                  report.data += sensor.records[l].value;
                  num++;
                }
              }
            }
          }
        }
      }

      report.data /= (num == 0 ? 1 : num);
      break;
    }
  }

  if(!found) {
    report.message = 'ERORR: No field has been found with this id.';
  }

  return report;
}



module.exports = ReportMaker;