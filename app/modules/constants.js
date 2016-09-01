var constants = {

	'regions': {
    'caribe': 1,
    'andina': 2,
    'pacifica': 3,
    'orinoquia': 4,
    'amazonas': 5 
  },

  'report_types': {
    'consumo_energetico': 1,
    'produccion_fluido': 2,
    'temperatura': 3
  },

  'report_entities': {
    'REGION': 1,
    'FIELD': 2,
    'WELL': 3,
    'SENSOR': 4,
  },

  'sensor_type': {
    'FLOW': 1,
    'ENERGY': 2,
    'TEMPERATURE': 3,
    'EMERGENCY': 4,
  },

  'well_status': {
    'OPEN': 1,
    'SHUT_DOWN': 2,
    'STOPPED': 3,
    'PRODUCTION': 4,
  },

  'report_to_sensor':{
    'consumo_energetico':'ENERGY',
    'produccion_fluido':'FLOW',
    'temperatura': 'TEMPERATURE'
  }
}

module.exports = constants;