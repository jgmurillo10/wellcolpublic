well-col
========

version: 1.0

What is well-col?
------------------
well-col is an application build using NodeJS to allow OilCol S.A (fake company) to recieve data and store it from 
its sensors located at its multiple wells in Colombia.

Where is the projects website?
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
| GET |  |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

##Sensors

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/sensors |   |
| GET |  /api/sensors/:sensor_id |   |
| POST  | /api/sensors  |   |
| PUT  |  /api/sensors/:sensor_id |   |
| DELETE  |  /api/sensors/:sensor_id |   |

##Emergencies

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/emergencies |   |
| GET |  /api/emergencies/:emergency_id |   |
| POST  | /api/emergencies  |   |
| PUT  |  /api/emergencies/:emergency_id |   |
| DELETE  |  /api/emergencies/:emergency_id |   |



##Reports

|HTTP Method   |  URI |  description |
|---|---|---|
| GET  |  /api/reports/regions/:id_region/:report_type |   |
| GET  |  /api/reports/fields/:id_field/:report_type  |   |
| GET  |  /api/reports/wells/:id_well/:report_type |   |
| POST  | /api/reports/wells/:id_well/:report_type  |   |


