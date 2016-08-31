var constants = {

	'regions': {
    'CARIBE': 1,
    'ANDINA': 2,
    'PACIFICA': 3,
    'ORINOQUIA': 4,
    'AMAZONAS': 5 
  },

  'report_types': {
    'CONSUMO_ENERGETICO': 1,
    'PRODUCCION_FLUIDO': 2,
    'TEMPERATURA': 3
  },

  'report_entity': {
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

  'well_state': {
    'OPEN': 1,
    'SHUT_DOWN': 2,
    'STOPPED': 3,
    'PRODUCTION': 4,
  }
}

module.exports = constants;