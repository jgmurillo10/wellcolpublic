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
      'region': 1,
      'wells':[
        {
          'status': 1,
          'id': 1,
          'latitude': 4.603185,  // decimal coordinates
          'longitude': -74.065210,
          'sensors':
          [
            {
              'id': 1,
              'wellid': 1,
              'type': 1,
              'rate': 600, // in sec
              'records':[
                  {
                    'id': 1,
                    'date': '2016-08-31T18:07:47-05:00',
                    'value': 10
                  },
                  {
                    'id': 2,
                    'date': '2016-08-31T18:07:47-05:00',
                    'value': 180 
                  },
                  {
                    'id': 3,
                    'date': '2016-08-31T18:07:47-05:00',
                    'value': 180 
                  }
              ]
            },
            {
              'id': 2,
              'wellid': 1,
              'type': 2,
              'rate': 5, 
              'records':[
                {
                  'id': 1,
                  'date': '2016-08-31T18:07:47-05:00',
                  'value': 10
                },
                {
                  'id': 2,
                  'date': '2016-08-31T18:07:47-05:00',
                  'value': 180 
                },
                {
                  'id': 3,
                  'date': '2016-08-31T18:07:47-05:00',
                  'value': 180 
                }
              ]
            },
            {
              'id': 3,
              'wellid': 1,
              'type': 3,
              'rate': 1
            },
            {
              'id': 4,
              'wellid': 1,
              'type': 2,
              'rate': 15
            },
            {
              'id': 5,
              'wellid': 1,
              'type': 4,
              'rate': -1 // every time there is an emergency
            }
          ]
        },
        {
          'status': 3,
          'id': 2,
          'sensors':[]
        },
        {
          'status': 4,
          'id': 3,
          'sensors':[]
        },
        {
          'status': 2,
          'id': 4,
          'sensors':[]
        }
      ]
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