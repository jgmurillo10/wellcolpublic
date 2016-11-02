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

##Regions

|HTTP Method   |  URI |  description |
|---|---|---|
| GET | /api/regions  |  Get all the regions |
| GET | /api/regions/:region_id  | Get an specific Region by ID  |
| POST  | /api/region  |  Add a Region |
| PUT  | /api/region/:region_id  | Update a Region  |
| DELETE  |  /api/regions/:region_id |  Delete a Region by ID |


##Fields

|HTTP Method   |  URI |  description |
|---|---|---|
| GET | /api/fields  | Get all the Fields  |
| GET | /api/fields/:field_id  | Get a Field by ID  |
| POST  | /api/fields  |  Add a Field |
| PUT  | /api/fields/:field_id  |  Update a Field |
| DELETE  |  /api/fields/:field_id |  Delete a Field by ID |

|HTTP Method   |  URI |  description |
|---|---|---|
| GET | /api/regions/:region_id/fields  | Get all the Fields of an specific Region |
| GET | /api/regions/:region_id/fields/:field_id  | Get a Field by ID of an specific Region |
| POST  | /api/regions/:region_id/fields  |  Add a Field of an specific Region |
| PUT  | /api/regions/:region_id/fields/:field_id  |  Update a Field of an specific Region |
| DELETE  |  /api/regions/:region_id/fields/:field_id |  Delete a Field by ID of an specific Region|

##Wells

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |/api/wells  |  Get all the Wells |
| GET |/api/wells/:well_id   | Get an specific Well  |
| POST  |/api/wells   |  Add an specific Well |
| PUT  |/api/wells/:well_id   |  Update an specific Well by ID|
| DELETE  |/api/wells/:well_id   |  Delete an specific Well by ID |


| GET |api/fields/:field_id/wells/|  Get all the wells of an specific Field |
| GET |api/fields/:field_id/wells/:well_id | Get an specific Well by well_id of an specific Field |
| POST  |api/fields/:field_id/wells/   |  Add an specific Well of an specific Field |
| PUT  |/api/fields/:field_id/wells/:well_id   | Update an specific Well of an specific Field  |
| DELETE  |api/fields/:field_id/wells/:well_id   |  Delete an specific Well of an specific Field |

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
| GET |  /api/emergencies |  Get all the emergencies |
| GET |  /api/emergencies/:emergency_id |  Get an specific emergency |
| POST  | /api/emergencies  |   Add an specific emergency|
| PUT  |  /api/emergencies/:emergency_id |  Update an specific emergency |
| DELETE  |  /api/emergencies/:emergency_id |  Delete an specific emergency |



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


