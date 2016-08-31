module.exports = {
  'users': [
    {
      'name': 'Juan Pérez',
      'status': 'Jefe de Campo',
      'id': 12345678
    },
    {
      'name': 'Pepito Pérez',
      'status': 'Jefe de Campo',
      'id': 12345679
    },
  ],
  'fields':[
  {
    'name':'field 1',
    'id': 1,
    'region': 'caribe',
    'wells':[
    {
      'status': 'abierto',
      'id': 1,
      'latitude': 4.603185,  // decimal coordinates
      'longitude': -74.065210,
      'sensors':[
      {
        'id': 1,
        'wellid': 1,
        'type': 'caudal',
        'rate': 10 // in min
      },
      {
        'id': 2,
        'wellid': 1,
        'type': 'energia',
        'rate': 5 // in min
      },
      {
        'id': 3,
        'wellid': 1,
        'type': 'temperatura',
        'rate': 1 // in secs
      },
      {
        'id': 4,
        'wellid': 1,
        'type': 'energia',
        'rate': 15 // in min
      },
      {
        'id': 5,
        'wellid': 1,
        'type': 'emergencia',
        'rate': -1 // every time there is an emergency
      }
      ]
    },
    {
      'status': 'parado',
      'id': 2,
      'sensors':[]
    },
    {
      'status': 'produccion',
      'id': 3,
      'sensors':[]
    },
    {
      'status': 'clausurado',
      'id': 4,
      'sensors':[]
    }
    ]
  }
  ],

  'wells':[
  {
    'name': 'Pozo petrolifero 1',
    'status': 'Abierto',
    'id': 1,
    'region': 'Andina',
    'field' : 'Altiplano cundiboyacense',
    'sensors':[]
  },
  {
    'name': 'Pozo petrolifero 2',
    'status': 'Produccion',
    'id': 2,
    'region': 'Andina',
    'field' : 'Altiplano cundiboyacense',
    'sensors':[]
  },
  {
    'name': 'Pozo petrolifero 3',
    'status': 'Parado',
    'id': 3,
    'region': 'Oriental',
    'field' : 'Llanos orientales',
    'sensors':[]
  },
  {
    'name': 'Pozo petrolifero 4',
    'status': 'Clausurado',
    'id': 4,
    'region': 'Oriental',
    'field' : 'Llanos orientales',
    'sensors':[]
  }
  ],
  'sensors':[
  {
    'id': 1,
    'wellid': 1,
    'type': 'Caudal',
    'rate': 10 // in min
  },
  {
    'id': 2,
    'wellid': 2,
    'type': 'Energia',
    'rate': 5 // in min
  },
  {
    'id': 3,
    'wellid': 2,
    'type': 'Temperatura',
    'rate': 1 // in secs
  },
  {
    'id': 4,
    'wellid': 3,
    'type': 'Energia',
    'rate': 15 // in min
  },
  {
    'id': 5,
    'wellid': 4,
    'type': 'Emergencia',
    'rate': -1 // every time there is an emergency
  }
  ],
  'emergencies':[
  {
    'id': 1,
    'wellid': 1,
    'type': 'incendio',
    'state': 'active'
  },
  {
    'id': 2,
    'wellid': 1,
    'type': 'bloqueo',
    'state': 'active'
  },
  {
    'id': 3,
    'wellid': 2,
    'type': 'incendio',
    'state': 'inactive'
  },
  {
    'id': 4,
    'wellid': 1,
    'type': 'danio_electrico',
    'state': 'inactive'
  },
  {
    'id': 5,
    'wellid': 1,
    'type': 'bloqueo',
    'state': 'active'
  },
  ],
};