well-col
========

version: 1.0

What is well-col?
------------------
well-col is an application build using NodeJS to allow OilCol S.A (fake company) to recieve data and store it from 
its sensors at the multiple wells in Colombia.

Where is the projects website?
-------------------------------
https://sistemasacademico.uniandes.edu.co/~isis2503/dokuwiki/doku.php?id=proyectos:201620

What tools are used?
---------------------
Javascript, NodeJS, Express.

API
---------------------



Users

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

Fields

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |   |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

Wells

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  |   |
| GET |   |   |
| POST  |   |   |
| PUT  |   |   |
| DELETE  |   |   |

Sensors

|HTTP Method   |  URI |  description |
|---|---|---|
| GET |  /api/sensors |   |
| GET |  /api/sensors/:sensor_id |   |
| POST  | /api/sensors  |   |
| PUT  |  /api/sensors/:sensor_id |   |
| DELETE  |  /api/sensors/:sensor_id |   |



Reports

|HTTP Method   |  URI |  description |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |


GET		/api/reports/region/:id_region/:report_type 

GET		/api/reports/field/:id_field

GET 	/api/reports/:id_region

POST 	/api/reports

