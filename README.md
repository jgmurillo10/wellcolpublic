well-col
========

version: 1.0

What is well-col?
------------------
well-col is an application build using NodeJS to allow OilCol S.A (fake company) to recieve data and store it from 
its sensors located at its multiple wells in Colombia.

Where is the project website?
-------------------------------
https://sistemasacademico.uniandes.edu.co/~isis2503/dokuwiki/doku.php?id=proyectos:201620

What tools are used?
---------------------
Javascript, NodeJS, Express.

API
---------------------



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
| GET |   |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

##Wells

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |/api/wells  |   |
| GET |/api/wells/:well_id   |   |
| POST  |/api/wells   |   |
| PUT  |/api/wells/:well_id   |   |
| DELETE  |/api/wells/:well_id   |   |

##Sensors

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/sensors |   |
| GET |  /api/sensors/:sensor_id |   |
| POST  | /api/sensors  |   |
| PUT  |  /api/sensors/:sensor_id |   |
| DELETE  |  /api/sensors/:sensor_id |   |

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
| GET  |  /api/reports/regions/:id_region/:report_type/:from-:to | Asks for a report of a certain type from certain region in the specified interval of time   |
| GET  |  /api/reports/fields/:id_field/:report_type./:from-:to  | Asks for a report of a certain type from certain field in the specified interval of time  |
| GET  |  /api/reports/wells/:id_well/:report_type/:from-:to |  Asks for a report of a certain type from certain well in the specified interval of time |
| POST  | /api/reports/wells/:id_well/:report_type  |  Report sent by a sensor located somewhere in the country |


