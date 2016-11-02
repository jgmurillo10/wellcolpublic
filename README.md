well-col
========

version: 1.0

What is well-col?
------------------
well-col is an application build using NodeJS to allow OilCol S.A (fake company) to recieve data and store it from 
its sensors located at its multiple wells in Colombia.

Does it have a website?
------------------------
https://wells-col.herokuapp.com/


Where are the requirements for the project?
-------------------------------
https://sistemasacademico.uniandes.edu.co/~isis2503/dokuwiki/doku.php?id=proyectos:201620

What tools are used?
---------------------
Javascript, NodeJS, Express for the front and service expousure. PosgreSQL for persistance and JWT for authentication.

API
---------------------
Some of the information required is entered using Node-red.


##Users

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

##Fields

|HTTP Method   |  URI |  description |
|---|---|---|
| GET | /api/fields  |   |
| GET | /api/fields/field_id  |   |
| POST  | /api/fields  |   |
| PUT  | /api/fields/field_id  |   |
| DELETE  |  /api/fields/field_id |   |

##Wells

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |/api/wells  |   |
| GET |/api/wells/:well_id   |   |
| POST  |/api/wells   |   |
| PUT  |/api/wells/:well_id   |   |
| DELETE  |/api/wells/:well_id   |   |

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |api/fields/:field_id/wells/|   |
| GET |api/fields/:field_id/wells/:well_id | |
| POST  |api/fields/:field_id/wells/   |   |
| PUT  |/api/fields/:field_id/wells/:well_id   |   |
| DELETE  |api/fields/:field_id/wells/:well_id   |   |

##Sensors

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/fields/:field_id/wells/:well_id/sensors | Gets all the sensors of an specific well in an specific field  |
| GET |  /api/fields/:field_id/wells/:well_id/sensors/:sensor_id |Gets a particular sensor of an specific well in an specific field   |
| POST  | /api/fields/:field_id/wells/:well_id/sensors  | Adds a sensor to an specific well in an specific field  |
| PUT  |  /api/fields/:field_id/wells/:well_id/sensors/:sensor_id | Updates an specific sensor of an specific well in an specific field  |
| DELETE  | /api/fields/:field_id/wells/:well_id/sensors/:sensor_id | Deletes a sensor of an specific well in an specific field  |

##Emergencies

This entity is very important and it should be managed differently from the others, as we have to notify the chiefs.

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/emergencies |   |
| GET |  /api/emergencies/:emergency_id |   |
| POST  | /api/emergencies  |   |
| PUT  |  /api/emergencies/:emergency_id |   |
| DELETE  |  /api/emergencies/:emergency_id |   |



##Reports

This API allows both mobile and desktop clients to ask for data to make reports from certain wells, fields or regions. (All the GET )
It also allows sensors to report their data to our central system. (The POST)

:report_type can only be of two types: consumo_energetico || produccion_fluido


|HTTP Method   |  URI |  description |
|---|---|---|
| GET  |  /api/reports/regions/:region/:report_type/:from-:to | Asks for a report of a certain type from certain region in the specified interval of time   |
| GET  |  /api/reports/fields/:field_id/:report_type./:from-:to  | Asks for a report of a certain type from certain field in the specified interval of time  |
| GET  |  /api/reports/wells/:well_id/:report_type/:from-:to |  Asks for a report of a certain type from certain well in the specified interval of time |
| POST  | /api/reports/wells/:well_id/:report_type  |  Report sent by a sensor located somewhere in the country |


